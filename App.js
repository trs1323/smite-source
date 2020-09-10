import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from './components/Header';
import Menu from './screens/Menu';

export default function App() {
  const [menu, showMenu] = useState(false)


  let content;
  if (menu === true) {
    content = <Menu />
  } else {
    content = <View></View>
  }
  return (
    <View style={styles.container}>
      <Header showMenu={showMenu} menu={menu} />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#252b45'
  },
});
