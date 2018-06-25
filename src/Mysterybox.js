import React, { Component } from 'react';
import { View, StyleSheet, Text, AsyncStorage, Alert, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import Header from './Header'
import Logo from './Logo'
import MysteryBoxForm from './MysteryBoxForm'

class MysteryBox extends Component {

   state = {
       interval: '',
       worth: '',
       favourite_colours: '',
       expectation: '',
       contact_name: '',
       age: '',
       contact_number: '',
       address: ''
   }

   onSubmit = async () => {
     const url = 'http://50.116.8.175/api/v1/service/rosefabrics/db'
     axios.defaults.headers.common['Devless-token'] = 'd463354149e3e51dd115ec140819e0a7';
     try{
         if (
             this.state.interval == '' || 
             this.state.worth == '' || 
             this.state.favourite_colours == '' || 
             this.state.expectation == '' || 
             this.state.contact_name == '' ||
             this.state.age == '' ||
             this.state.contact_number == '' ||
             this.state.address == '' 
            ){
                Alert.alert('One of your details is empty');
            }
            else {
                const mysteryBoxSub = await axios.post(url, {
                    "resource": [{
                        "name": "mystery_box",
                        "field": [{
                            "interval": this.state.interval,
                            "worth": this.state.worth,
                            "favourite_colours": this.state.favourite_colours,
                            "expectation": this.state.expectation,
                            "contact_name": this.state.contact_name,
                            "age": this.state.age,
                            "contact_number": this.state.contact_number,
                            "address": this.state.address
                        }]
                    }]
                })
                Alert.alert("Successfully subscribed. You can go back to view more fabrics.");
                this.setState({
                    interval: '',
                    worth: '',
                    favourite_colours: '',
                    expectation: '',
                    contact_name: '',
                    age: '',
                    contact_number: '',
                    address: ''
                })
            }
     }catch(e){
         Alert.alert('Sorry error occurred')
     }
     
   }

   onChange = (key, val) => {
      this.setState({[key]: val})
   }

    render(){
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <MysteryBoxForm type='Subscribe' fields={this.state} onChange={this.onChange} onSubmit={this.onSubmit}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: '10%',
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
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
export default MysteryBox