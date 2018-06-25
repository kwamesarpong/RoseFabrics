import React, { PureComponent } from 'react';
import axios from 'axios'
import { View, Alert, ScrollView, Linking, AsyncStorage, StyleSheet, Dimensions, ActivityIndicator, Image } from 'react-native';
import { Button, Icon, Fab } from 'native-base';
import { Card } from 'react-native-elements';
import { Actions } from 'react-native-router-flux'
import Header from './Header'
import SearchBar from './Search'
import Products from './Products'
import Selection from './Selection'
import OneSignal from 'react-native-onesignal';

class Home extends PureComponent {

  state = {
    img: ' ',
    dealImg: ' ',
    mysteryImg: ' ',
    loading: true,
    active: false
  }

  async componentDidMount() {

    const url = 'http://50.116.8.175/api/v1/service/rosefabrics/db?table=slider'
    const res = await axios.get(url, {headers: {'Devless-token': 'd463354149e3e51dd115ec140819e0a7'}})
    let sliderImage = res.data.payload.results;
    let sliderArray = sliderImage.reverse();

    this.setState({
      img: sliderArray[0].img_one,
      loading: false
    })
    
  }

  async componentWillMount() {

          if(await AsyncStorage.getItem('token')){
              this.setState({ loading: false })
          }
          else {
              this.setState({ loading: false })
              Actions.login()
          }

          OneSignal.addEventListener('received', this.onReceived);
          OneSignal.addEventListener('opened', this.onOpened);
          OneSignal.addEventListener('ids', this.onIds);
      }

      componentWillUnmount() {
          OneSignal.removeEventListener('received', this.onReceived);
          OneSignal.removeEventListener('opened', this.onOpened);
          OneSignal.removeEventListener('ids', this.onIds);
      }

      onReceived(notification) {
          console.log("Notification received: ", notification);
      }

      onOpened(openResult) {
        console.log('Message: ', openResult.notification.payload.body);
        console.log('Data: ', openResult.notification.payload.additionalData);
        console.log('isActive: ', openResult.notification.isAppInFocus);
        console.log('openResult: ', openResult);
      }

      onIds(device) {
  		console.log('Device info: ', device);
      }


handleSelect = (data) => {
  Actions.product({data})
}

makeCall = () => {
  Linking.openURL('tel:+233272954084');
}

liveMessaging = () => {
  Linking.openURL('https://tawk.to/chat/58c9418441acfb239f8daf04/default/?$_tawk_popout=true').catch(err => console.error('An error occurred', err))
}

 render(){
   console.log(this.props.navigation.state.params.name)
    if(this.state.loading){
      return (<View style={{alignItems: 'center', paddingTop: '50%', backgroundColor: '#ffffff', height: '100%'}}>
                <ActivityIndicator size="large" color='brown' />
              </View>)
    }
    /* if(this.state.loading){
      return (
          <View style={{flex: 1}}>
            <View style={{flex: 1}}>
                <Image source={require('../splash.png')} style={{width:'100%', height:'100%'}} />
            </View>
          </View>
      ) 
    } */
    return (
      <View style={{flex:1, backgroundColor:'white'}}>
      {/* { Alert.alert(`Welocome ${this.props.params.name}`)} */}
      <ScrollView>
        <SearchBar />
        <Card
        containerStyle={styles.container}
        wrapperStyle={styles.wrapper}
        imageStyle={styles.image}
        imageWrapperStyle={styles.imageWrapper}
        image={{uri: this.state.img}}>
        </Card>
        <Selection />
        <Products handleSelect={this.handleSelect}/>
     </ScrollView>
      <View style={{alignItems:'flex-end'}}>
        <Fab
          active={this.state.active}
          direction="up"
          containerStyle={{ }}
          style={{ backgroundColor: 'brown' }}
          position="bottomRight"
          onPress={() => this.setState({ active: !this.state.active })}>
          <Icon name="ios-add" />
          <Button style={{ backgroundColor: '#34A34F' }} onPress={this.makeCall}>
            <Icon name="ios-call" />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }} onPress={this.liveMessaging}>
            <Icon name="ios-mail" />
          </Button>
        </Fab>
       </View>
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

export default Home