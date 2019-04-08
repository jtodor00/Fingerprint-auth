import React, { Component } from 'react';
import { createStackNavigator, createAppContainer } from "react-navigation";

import { Home } from './components/home';
import { ScanFingerprint } from './components/scanFingerprint';
import { RegisterDevice } from './components/registerDevice';



const AppNavigator = createStackNavigator(
  {
    Home: Home,
    RegisterDevice : RegisterDevice,
    ScanFingerprint : ScanFingerprint,
  },
  {
    initialRouteName: "Home"
  }
);
const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}