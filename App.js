import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, Modal, BackHandler } from 'react-native';

import Header from './components/Header';
import Menu from './screens/Menu';
import God from './screens/God';
import Build from './screens/Build';
import Home from './screens/Home';
import TierLists from './screens/TierLists';


export default function App() {
  //screens
  const [menu, showMenu] = useState(false);
  const [godScreen, showGodScreen] = useState(false);
  const [buildScreen, showBuildScreen] = useState(false);
  const [tierlistScreen, showTierlist] = useState(false);
  const [aboutScreen, showAboutScreen] = useState(false);
  const [giveawayScreen, showGiveawayScreen] = useState(false);

  //info
  const [god, setGod] = useState();
  const [build, setBuild] = useState();
  const [allGods, setAllGods] = useState();
  const [currentGod, setCurrentGod] = useState();
  const [currentGodImg, setCurrentGodImg] = useState();
  const [GodSelected, setGodSelected] = useState();
  const [currentBuild, setCurrentBuild] = useState();
  const [currentTierlist, setCurrentTierlist] = useState();
  const [currentUpdate, setCurrentUpdate] = useState();

  const [isLoading, setLoading] = useState(true);






  useEffect(() => {
    fetch('https://us-central1-smite-source.cloudfunctions.net/api/gods')
      .then((response) =>
        response.json()
      )
      .then((json) => setAllGods(json.data.gods))
      .catch((error) => console.error(error))
    fetch('https://cms.smitegame.com/wp-json/smite-api/get-posts/1')
      .then((response) =>
        response.json()
      )
      .then((json) => setCurrentUpdate(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false))


  }, []);


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
  if (isLoading === true) {
    content = <ActivityIndicator />
  } else if (godScreen === true) {
    content = <God god={god} setBuild={setBuild} showGodScreen={showGodScreen} showBuildScreen={showBuildScreen} allGods={allGods} setCurrentGod={setCurrentGod} setCurrentGodImg={setCurrentGodImg} setLoading={setLoading} GodSelected={GodSelected} setCurrentBuild={setCurrentBuild} />
  } else if (buildScreen === true) {
    content = <Build build={build} god={god} allGods={allGods} currentGod={currentGod} currentGodImg={currentGodImg} setLoading={setLoading} currentBuild={currentBuild} />
  } else if (aboutScreen === true) {
    content = <View><Text style={styles.yellowText}>Coming Soon</Text></View>
  } else if (giveawayScreen === true) {
    content = <View><Text style={styles.yellowText}>Coming Soon</Text></View>
  } else if (tierlistScreen === true) {
    content = <TierLists setLoading={setLoading} currentTierlist={currentTierlist} />
  } else {
    content = <Home currentUpdate={currentUpdate} />
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

          <Menu setGod={setGod} showMenu={showMenu} showGodScreen={showGodScreen} showBuildScreen={showBuildScreen} showTierlist={showTierlist} showAboutScreen={showAboutScreen} showGiveawayScreen={showGiveawayScreen} allGods={allGods} setLoading={setLoading} setGodSelected={setGodSelected} setCurrentTierlist={setCurrentTierlist} />
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
