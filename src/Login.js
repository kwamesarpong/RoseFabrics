import React, { Component } from 'react';
import { View, StyleSheet, Text, Alert, TouchableOpacity, ActivityIndicator, AsyncStorage, ScrollView, KeyboardAvoidingView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import axios from 'axios'
import Logo from './Logo'
import Form from './Form'

class Login extends Component {

    state = {
        email: '',
        password: '',
        loading: false
    }
    
    onSubmit = async () => {
            const url = 'http://50.116.8.175/api/v1/service/devless/rpc?action=login'
            axios.defaults.headers.common['Devless-token'] = 'd463354149e3e51dd115ec140819e0a7';
            this.setState({loading: true})
            try{
                if(
                    this.state.email == '' ||
                    this.state.password == ''
                ) {
                    Alert.alert('One of your fields is empty')
                }
                else {
                    const user = await axios.post(url, {
                        "jsonrpc": "2.0",
                        "method": "devless",
                         "id": "1000",
                            "params": [
                                null,
                                this.state.email,
                                null,
                                this.state.password
                               ]
                           })

                    if(!user.data.payload.result.token) {
                        this.setState({loading:false})
                        return Alert.alert('Sorry your credentials are invalid')
                    }
                    else {
                        await AsyncStorage.setItem('token', user.data.payload.result.token)
                        await AsyncStorage.setItem('user_id', JSON.stringify(user.data.payload.result.profile.id))
                        await AsyncStorage.setItem('email', JSON.stringify(user.data.payload.result.profile.email))
                        await AsyncStorage.setItem('first_name', JSON.stringify(user.data.payload.result.profile.first_name))
                        await AsyncStorage.setItem('last_name', JSON.stringify(user.data.payload.result.profile.last_name))
                        await AsyncStorage.setItem('phone_number', JSON.stringify(user.data.payload.result.profile.phone_number))
                        this.setState({loading:false})
                        Actions.home({name:user.data.payload.result.profile.first_name})
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
        const {email, password} = this.state
        if(this.state.loading){
          return (<View style={styles.container}>
                  <ActivityIndicator size="large" color='brown' />
                 </View>)
        }
        return (
            <ScrollView style={styles.container} contentContainerStyle={{flexGrow : 1, justifyContent : 'center', alignItems: 'center'}}>
                <KeyboardAvoidingView behavior="padding">
                <View style={{paddingTop: 20, paddingBottom: 30}}></View>
                <Form type='Login' fields={this.state} onChange={this.onChange} onSubmit={this.onSubmit}/>
                <View style={styles.signupTextCont}>
					<Text style={styles.signupText}>Don't have an account yet?</Text>
                    <TouchableOpacity onPress={() => Actions.signup()}>
                        <Text style={styles.signupButton}> Signup</Text>
                    </TouchableOpacity>
				</View>
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop:'20%',
        flex: 1,
        backgroundColor: '#ffffff'
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
export default Login