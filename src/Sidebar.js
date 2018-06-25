import React, { PureComponent } from 'react'
import { View, ScrollView, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native'
import { Icon } from 'native-base'
import { Actions } from 'react-native-router-flux';
import axios from 'axios'
import SidebarCats from './SidebarCats'
import { KeyboardAwareListView } from 'react-native-keyboard-aware-scroll-view';

class Sidebar extends PureComponent {

    state = {
        data: [],
        firstName: '',
        status: false,
        madeOfRStatus : false
      }

    async componentWillMount(){
        const url = 'http://50.116.8.175/api/v1/service/rosefabrics/db?table=categories'
        const res = await axios.get(url, {headers: {'Devless-token': 'd463354149e3e51dd115ec140819e0a7'}})
        const resReversed = res.data.payload.results.reverse();
        const resSliced = resReversed.slice(0, 5)
        this.setState({ data:resSliced })
        console.log(resSliced)

        let userFirstname = await AsyncStorage.getItem('first_name')
        let parsedFirstname = JSON.parse(userFirstname)
        let stringFirstname = parsedFirstname.toString()

        this.setState({ firstName: stringFirstname })
      }

      handleClick = async(data) => {
        await AsyncStorage.setItem('cat', JSON.stringify(data))
        Actions.categorieshome();
      }

      toggleStatus = () => {
          this.setState({
            status: !this.state.status
          })
      }

      toggleMORStatus = () => {
        this.setState({
            madeOfRStatus: !this.state.madeOfRStatus
        })
    }

      renderCats = () => {
        return this.state.data.map((data, i) => {
          return (
           <SidebarCats
            key={i}
            {...data}
            handleClick={this.handleClick}
           />
          )
         
        })
      }

    logout = async() => {
        await AsyncStorage.removeItem('token')
        await AsyncStorage.removeItem('user_id')
        await AsyncStorage.removeItem('pushtoken')
        Actions.login()
    }

    render(){
        return (
            <ScrollView>
                <View style={{ flex: 1, flexDirection: 'row', backgroundColor: 'brown' }}>
                    <View style={{ width: '30%', paddingTop: 10, paddingBottom: 10, paddingLeft: 20 }}>
                        <Image source={require('../pic.jpg')} style={{ width: 30, height: 30, borderRadius: 50 }} />
                    </View>
                    <View style={{ width: '70%', paddingTop: 10, paddingBottom: 10 }}>
                        <Text style={{ fontSize: 20, color: '#ffffff' }}>{this.state.firstName}</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', paddingBottom: 30 }}>
                <TouchableOpacity onPress={() => Actions.home()} style={{flexDirection:'row', alignItems:'center', paddingTop:20, paddingLeft:20}}>
                    <Image source={require('../home.png')} />
                    <Text style={{paddingLeft:40}}>Home</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.carts()}  style={{flexDirection:'row', alignItems:'center', paddingTop:20, paddingLeft:20}}>
                    <Image source={require('../carts.png')} />
                    <Text style={{paddingLeft:40}}>Carts</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toggleStatus} style={{flexDirection:'row', alignItems:'center', paddingTop:20, paddingLeft:20}}>
                    <Image source={require('../category.png')} />
                    <Text style={{paddingLeft:40}}>Categories</Text>
                    <Icon name='ios-arrow-down' style={{fontSize: 15, color: 'brown', paddingLeft: 80}} />
                </TouchableOpacity>
                {
                    this.state.status ? (
                        this.renderCats()
                    ) : (
                        null
                    )
                }
                <TouchableOpacity onPress={this.toggleMORStatus} style={{flexDirection:'row', alignItems:'center', paddingTop:20, paddingLeft:20}}>
                    <Image source={require('../category.png')} />
                    <Text style={{paddingLeft:40}}>Made of Rose</Text>
                    <Icon name='ios-arrow-down' style={{fontSize: 15, color: 'brown', paddingLeft: 60}} />
                </TouchableOpacity>
                {
                    this.state.madeOfRStatus ? (
                        <View>
                            <TouchableOpacity onPress={
                                async() => {
                                        await AsyncStorage.setItem('cat', JSON.stringify('Men'))
                                        Actions.categorieshome()
                                    }
                                } style={{flexDirection:'row', alignItems:'center', paddingTop:20, paddingLeft:40}}>
                                <Image source={require('../category.png')} />
                                <Text style={{paddingLeft:40}}>Men</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={
                                async() => {
                                        await AsyncStorage.setItem('cat', JSON.stringify('Women'))
                                        Actions.categorieshome()
                                    }
                                } style={{flexDirection:'row', alignItems:'center', paddingTop:20, paddingLeft:40}}>
                                <Image source={require('../category.png')} />
                                <Text style={{paddingLeft:40}}>Women</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={
                                async() => {
                                        await AsyncStorage.setItem('cat', JSON.stringify('Kids'))
                                        Actions.categorieshome()
                                    }
                                } style={{flexDirection:'row', alignItems:'center', paddingTop:20, paddingLeft:40}}>
                                <Image source={require('../category.png')} />
                                <Text style={{paddingLeft:40}}>Kids</Text>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        null
                    )
                }
                <TouchableOpacity onPress={() => Actions.notificationshome()} style={{flexDirection:'row', alignItems:'center', paddingTop:20, paddingLeft:20}}>
                    <Image source={require('../notifications.png')} />
                    <Text style={{paddingLeft:40}}>Notifications</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.transactionshome()} style={{flexDirection:'row', alignItems:'center', paddingTop:20, paddingLeft:20}}>
                    <Image source={require('../carts.png')} />
                    <Text style={{paddingLeft:40}}>Transaction History</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => Actions.tailorshome()} style={{flexDirection:'row', alignItems:'center', paddingTop:20, paddingLeft:20}}>
                    <Image source={require('../tailor.png')} />
                    <Text style={{paddingLeft:40}}>Find Designers</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.logout} style={{flexDirection:'row', alignItems:'center', paddingTop:20, paddingLeft:20}}>
                    <Image source={require('../logout.png')} />
                    <Text style={{paddingLeft:40}}>Logout</Text>
                </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

export default Sidebar