//This is an example code for Navigation Drawer with Custom Side bar//
import React, { Component } from 'react';
//import react in our code.
import { StyleSheet, View, Text } from 'react-native';
// import all basic components

export default class Screen3 extends Component {
  //Screen3 Component
  render() {
    return (
      
      <View style={styles.MainContainer}>
        {/* <Text style={{ fontSize: 23 }}> Screen {global.currentScreenIndex + 1} </Text> */}
        <Text style={{ fontSize: 17 }}> Dados do Tanque</Text>
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