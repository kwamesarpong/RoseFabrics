import React, { PureComponent } from 'react';
import axios from 'axios'
import { View, Alert, ScrollView, Linking, AsyncStorage, StyleSheet, Dimensions, Text } from 'react-native';
import { Card, Icon } from 'react-native-elements';
import { Actions } from 'react-native-router-flux'
import Header from './Header'
import Notifications from './Notifications'

class NotificationsHome extends PureComponent {

  state = {
    img: ' ',
  }


 render(){
    return (
      <View style={{flex:1, backgroundColor:'white'}}>
        <ScrollView>
            <Text style={{paddingTop: 10, paddingBottom: 10, color: 'brown', fontSize: 20, alignSelf: 'center'}}>Notifications</Text>
            <Notifications />
        </ScrollView>
     </View>
    )
  }
} 

const styles = StyleSheet.create({
  container: {
      margin: 0,
      padding: 0
  },
  wrapper: {
      padding: 0,
      margin: 0,
      height: Dimensions.get('window') * 0.95
  },
  image: {
    height: 250,
  }
})

export default NotificationsHome