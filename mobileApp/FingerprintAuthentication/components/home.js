import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';

export class Home extends Component {
  static navigationOptions = {
    title: 'Fingerprint Autheticator',
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
  constructor(props)
  {
    super(props);
    this.state = {appState : 0}
  }
  handleRegisterDevice = () => {
    this.setState({appState : 1});
  }
  handleScanFingerprint = () => {
    this.setState({appState : 2});
  }
  render() {
    return (
      <View style={styles.container}>
            <View style={styles.buttonWrap}>
                <Button title="Register this device" onPress={() => this.props.navigation.navigate('RegisterDevice')}></Button>
            </View>
                <Text style={styles.or}>OR</Text>
            <View style={styles.buttonWrap}>
                <Button title="Scan fingerprint" onPress={() => this.props.navigation.navigate('ScanFingerprint')}></Button>
            </View>
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
  buttonWrap : {
    width  : '70%',
  },
  or : {
    padding: 50,
    fontSize : 25,
  },
  
});
