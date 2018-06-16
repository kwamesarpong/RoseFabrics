import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Text, AsyncStorage, Alert,TouchableOpacity, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import Logo from './Logo'
import Form from './Form'

class Signup extends Component {

   state = {
       firstName: '',
       lastName: '',
       phone: '',
       password: '',
       email: '',
       loading: false
   }

   onSubmit = async () => {
     const url = 'http://50.116.8.175/api/v1/service/devless/rpc?action=signUp'
     axios.defaults.headers.common['Devless-token'] = 'd463354149e3e51dd115ec140819e0a7';
     this.setState({loading: true})
     try{
         if(
             this.state.firstName == '' ||
             this.state.lastName == '' ||
             this.state.phone == '' ||
             this.state.password == '' ||
             this.state.email == ''
            ) {
                Alert.alert('One of your fields is empty')
            }
            else {
                const user = await axios.post(url, {
                    "jsonrpc": "2.0",
                    "method": "devless",
                    "id": "1000",
                    "params": [
                            this.state.email,
                            this.state.password,
                            null,
                            this.state.phone,
                            this.state.firstName,
                            this.state.lastName,
                            null
                    ]
                })
                console.log(user.data)

                if(!user.data.payload.result.token) {
                    this.setState({loading:false})
                    Alert.alert('Sorry error occured')
                }
                else {
                    await AsyncStorage.setItem('token', user.data.payload.result.token)
                    await AsyncStorage.setItem('user_id', JSON.stringify(user.data.payload.result.profile.id))
                    await AsyncStorage.setItem('email', JSON.stringify(user.data.payload.result.profile.email))
                    await AsyncStorage.setItem('first_name', JSON.stringify(user.data.payload.result.profile.first_name))
                    await AsyncStorage.setItem('last_name', JSON.stringify(user.data.payload.result.profile.last_name))
                    await AsyncStorage.setItem('phone_number', JSON.stringify(user.data.payload.result.profile.phone_number))
                    this.setState({loading:false})
                    Actions.home({name: user.data.payload.result.profile.first_name})
                }
            }

     }catch(e){
         this.setState({loading:false})
         Alert.alert('Sorry an error occurred')
     }
     
   }

   onChange = (key, val) => {
      this.setState({[key]: val})
   }

    render(){
        if(this.state.loading){
            return (<View style={styles.container}>
                    <ActivityIndicator size="large" color='brown' />
                   </View>)
          }
        return (
            <ScrollView style={styles.container} contentContainerStyle={{flexGrow : 1, justifyContent : 'center', alignItems: 'center'}}>
                <KeyboardAvoidingView behavior="padding">
                <Form type='Signup' fields={this.state} onChange={this.onChange} onSubmit={this.onSubmit}/>
                <View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Already have an account?</Text>
					<TouchableOpacity onPress={() =>Actions.login()}><Text style={styles.signupButton}> Sign in</Text></TouchableOpacity>
				</View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: '20%',
        flex: 1,
        backgroundColor: 'white'
    },
    signupTextCont : {
      flexGrow: 1,
      alignItems:'flex-end',
      justifyContent :'center',
      paddingVertical:16,
      flexDirection:'row'
    },
    signupText: {
        color:'brown',
        fontSize:16
    },
    signupButton: {
        color:'brown',
        fontSize:16,
        fontWeight:'500'
    }
})
export default Signup