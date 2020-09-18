import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Modal, BackHandler } from 'react-native';
import EventEmitter from "react-native-md5";
import md5 from "react-native-md5";

import Header from './components/Header';
import Menu from './screens/Menu';
import God from './screens/God';
import Build from './screens/Build';
import Home from './screens/Home';
import TierLists from './screens/TierLists';

import Items from './data/Items.json';
import AllGods from './data/AllGods.json';

export default function App() {
  const [menu, showMenu] = useState(false);
  const [godScreen, showGodScreen] = useState(false);
  const [buildScreen, showBuildScreen] = useState(false);
  const [tierlistScreen, showTierlist] = useState(false);
  const [aboutScreen, showAboutScreen] = useState(false);
  const [giveawayScreen, showGiveawayScreen] = useState(false);
  const [god, setGod] = useState();
  const [build, setBuild] = useState();
  const [sessionId, setSessionId] = useState();
  const [allGods, setAllGods] = useState();
  const [allItems, setAllItems] = useState();
  const [isLoading, setLoading] = useState();

  useEffect(() => {
    let config = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Vary': 'Origin'
      }
    }

    let dt = new Date();

    let timestamp = `${dt.getFullYear().toString().padStart(4, '0')}${(dt.getMonth() + 1).toString().padStart(2, '0')}${dt.getUTCDate().toString().padStart(2, '0')}${dt.getUTCHours().toString().padStart(2, '0')}${dt.getUTCMinutes().toString().padStart(2, '0')}${dt.getUTCSeconds().toString().padStart(2, '0')}`;

    let signature = md5.hex_md5(`3359createsessionA73937BDE832463B8251CFEE8FB45862${timestamp}`);

    fetch(`http://api.smitegame.com/smiteapi.svc/createsessionjson/3359/${signature}/${timestamp}`)
      .then((response) =>
        response.json()
      )
      .then((json) => setSessionId(json.session_id))
      .catch((error) => console.error(error))
    console.log(sessionId)
    if (sessionId !== undefined) {
      console.log('Grabbing Gods')
      let dt = new Date();

      let godTimestamp = `${dt.getFullYear().toString().padStart(4, '0')}${(dt.getMonth() + 1).toString().padStart(2, '0')}${dt.getUTCDate().toString().padStart(2, '0')}${dt.getUTCHours().toString().padStart(2, '0')}${dt.getUTCMinutes().toString().padStart(2, '0')}${dt.getUTCSeconds().toString().padStart(2, '0')}`;
      let godSignature = md5.hex_md5(`3359getgodsA73937BDE832463B8251CFEE8FB45862${timestamp}`);

      fetch(`http://api.smitegame.com/smiteapi.svc/getgodsjson/3359/${godSignature}/${sessionId}/${godTimestamp}/1`)
        .then((response) => response.json())
        .then((json) => setAllGods(json))
        .catch((error) => setAllGods(AllGods))
    } else if (sessionId == undefined) {
      console.log('Using Backup')
      setAllGods(AllGods)
    }

    if (allGods !== undefined) {
      console.log('Grabbing Gods')
      let dt = new Date();

      let itemTimestamp = `${dt.getFullYear().toString().padStart(4, '0')}${(dt.getMonth() + 1).toString().padStart(2, '0')}${dt.getUTCDate().toString().padStart(2, '0')}${dt.getUTCHours().toString().padStart(2, '0')}${dt.getUTCMinutes().toString().padStart(2, '0')}${dt.getUTCSeconds().toString().padStart(2, '0')}`;
      let itemSignature = md5.hex_md5(`3359getitemsA73937BDE832463B8251CFEE8FB45862${timestamp}`);

      fetch(`http://api.smitegame.com/smiteapi.svc/getitemsjson/3359/${itemSignature}/${sessionId}/${itemTimestamp}/1`)
        .then((response) => response.json())
        .then((json) => setAllItems(json))
        .catch((error) => setAllItems(Items))
    } else if (sessionId == undefined) {
      console.log('Using Backup')
      setAllItems(Items)
    }
  }, [])



  BackHandler.addEventListener('hardwareBackPress', function () {
    if (godScreen === false && buildScreen === true) {
      showBuildScreen(false);
      showGodScreen(true);
      return true;

    } else if (menu && godScreen && buildScreen && tierlistScreen && aboutScreen && giveawayScreen === false) {
      return false;
    } else {
      showMenu(false);
      showGodScreen(false);
      showBuildScreen(false);
      showTierlist(false);
      showAboutScreen(false);
      showGiveawayScreen(false);
      return true;
    }
  })


  let content;
  if (godScreen === true) {
    content = <God god={god} setBuild={setBuild} showGodScreen={showGodScreen} showBuildScreen={showBuildScreen} allGods={allGods} allItems={allItems} />
  } else if (buildScreen === true) {
    content = <Build build={build} god={god} allGods={allGods} allItems={allItems} />
  } else if (aboutScreen === true) {
    content = <View><Text style={styles.yellowText}>Coming Soon</Text></View>
  } else if (giveawayScreen === true) {
    content = <View><Text style={styles.yellowText}>Coming Soon</Text></View>
  } else if (tierlistScreen === true) {
    content = <TierLists />
  } else {
    content = <Home />
  }

  return (
    <View style={styles.container}>
      <Header showMenu={showMenu} menu={menu} visible={menu} />
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={menu}
          onRequestClose={() => {
            showMenu(false)
          }}
        >

          <Menu setGod={setGod} showMenu={showMenu} showGodScreen={showGodScreen} showBuildScreen={showBuildScreen} showTierlist={showTierlist} showAboutScreen={showAboutScreen} showGiveawayScreen={showGiveawayScreen} allGods={allGods} allItems={allItems} />
        </Modal>
      </View>
      {content}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252b45'
  },
  yellowText: {
    color: '#fdcb6e',
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center'
  }
});
