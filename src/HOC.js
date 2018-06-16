import React, { PureComponent } from 'react';
import { AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux';

export default (Component) => {
  class Authentication extends PureComponent {
    async componentWillMount() {
      if (!await AsyncStorage.getItem('token')) {
         Actions.login()
      }
    }

    async componentWillUpdate(nextProps) {
      if (!!await AsyncStorage.getItem('token')) {
         Actions.login()
      }
    }

     render() {
      return <Component {...this.props} />;
    }
  }

  return Authentication;
};