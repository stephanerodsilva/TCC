//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text } from 'react-native';
// import all basic components

export default class Screen1 extends Component {
  //Screen1 Component
  render() {
    return (
      <View style={styles.MainContainer}>
        {/* <Text style={{ fontSize: 23 }}> Screen {global.currentScreenIndex + 1} </Text> */}
        <Text style={{ fontSize: 17 }}> Monitoramento do tanque e estação </Text>
        <Text style={{ fontSize: 15,marginTop: 8 }}> Use esse aplicativo para monitoramento do tanque e da estação </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    paddingTop: 8,
    // alignItems: 'center',
    marginTop: 8,
    // justifyContent: 'center',
  },
});