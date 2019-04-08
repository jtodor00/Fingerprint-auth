import React, { Component } from 'react';
import { Alert, StyleSheet, Text, View, Button } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Biometrics from 'react-native-biometrics'

var SERVER_URL = "http://24251502.ngrok.io";

export class RegisterDevice extends Component {
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
  constructor(props)
  {
    super(props);
    this.onSuccess = this.onSuccess.bind(this);
    this.generateSignature = this.generateSignature.bind(this);
    this.registerDevice = this.registerDevice.bind(this);
    this.sendDataToServer = this.sendDataToServer.bind(this);
  }
  onSuccess(e){
    let dataFromQR = JSON.parse(e.data);
    this.generateSignature(dataFromQR);
  }
  generateSignature(dataFromQR){
    Biometrics.isSensorAvailable()
      .then((biometryType) => {
      if (biometryType === Biometrics.TouchID) {
        Biometrics.createKeys('Generate keys')
          .then((publicKey) => {
            this.registerDevice({...dataFromQR, publicKey : publicKey});
          })
      } 
      else {
        console.log('Biometrics not supported')
      }
    })
  }
  registerDevice(data)
  {
      let payload = {...data, timestamp : Math.round((new Date()).getTime() / 1000).toString()};
      Biometrics.createSignature('Sign request', JSON.stringify(payload))
      .then((signature) => {
        this.sendDataToServer({...payload,signature});
      });
  }
  async sendDataToServer(payload){
      payload = JSON.stringify(payload);
      await fetch(SERVER_URL+'/users/registerDevice',
      {
        method:'POST',
        body: payload,
        headers:{
          'Content-Type': 'application/json'
        }
      })
      .then(res => res.json())
      .then((data) => {
        //show alert with data.error message
      });
  }
  
  render() {
    let activeComponent = null;

    return (
      <View style={styles.container}>
        <QRCodeScanner 
        onRead={this.onSuccess}
        bottomContent={
          <View style={styles.centerText}>
            <Text style={styles.textCenter}>Please scan QR code given on signup.</Text>
          </View>
        }
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor : "#212121"
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
  centerText: {
    flex: 1,
    width:'100%',
    justifyContent:'center',
    alignItems : 'center',
    backgroundColor : '#212121'
  },
  textCenter:{
    fontSize: 17,
    color: '#FFF',
  },
});
