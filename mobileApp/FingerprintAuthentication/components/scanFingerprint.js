import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';


export class ScanFingerprint extends Component {
  static navigationOptions = {
    title: 'Fingerprint Autheticator',
    headerLeft:null,
    headerStyle: { 
      backgroundColor: '#0F2944',
      height:80,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 4,
    },
    headerTitleStyle: { 
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'normal',
    },
  }
  render() {
    let activeComponent = null;

    return (
      <View style={styles.container}>
            <Text>Scan Finger</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow : {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});
