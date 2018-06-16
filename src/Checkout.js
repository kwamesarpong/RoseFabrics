import React, { PureComponent } from 'react'
import { View, ScrollView, Text, AsyncStorage, KeyboardAvoidingView, TouchableOpacity, Alert, TextInput, StyleSheet} from 'react-native'
import { Icon, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import Header from './Header'
import CheckoutForm from './CheckoutForm'

class Checkout extends PureComponent {

    state = {
        networkCode: '',
        mobileMoneyNo: '',
        vodafoneCode: ''
    }

    onChange = (code, item) => {
        this.setState({[code]: item})
     }

    onCheckout = async() => {
        const url = 'http://50.116.8.175/api/v1/service/rosefabrics/db'
        axios.defaults.headers.common['Devless-token'] = 'd463354149e3e51dd115ec140819e0a7';
        // let ids = this.state.carts.map(cart => cart.id)
        
        try {
            
            let userId = await AsyncStorage.getItem('user_id')

            let userEmail = await AsyncStorage.getItem('email')
            let parsedEmail = JSON.parse(userEmail)
            let stringEmail = parsedEmail.toString();
            
            let userFirstname = await AsyncStorage.getItem('first_name')
            let parsedFirstname = JSON.parse(userFirstname)
            let stringFirstname = parsedFirstname.toString();

            let userLastname = await AsyncStorage.getItem('last_name')
            let parsedLastname = JSON.parse(userLastname)
            let stringLastname = parsedLastname.toString();

            let stringFullname = stringFirstname + ' ' + stringLastname

            let userPhonenumber = await AsyncStorage.getItem('phone_number')

            let productIds = await AsyncStorage.getItem('ids')
            let parsedIds = JSON.parse(productIds)
            let stringIds = parsedIds.toString();

            let productQuantities = await AsyncStorage.getItem('quantities')
            let parsedQuantities = JSON.parse(productQuantities)
            let stringQuantities = parsedQuantities.toString();

            let totalPricing = await AsyncStorage.getItem('pricing')

            let addressPerson = await AsyncStorage.getItem('address')
            let parsedAddress = JSON.parse(addressPerson)
            let stringAddress = parsedAddress.toString()

            if (this.state.mobileMoneyNo == '' || this.state.networkCode == ''){
                Alert.alert('One of your fields is empty')
            }
            else {
                const res = await axios.post(url, {
                    "resource": [{
                        "name": "transaction",
                        "field": [{
                            "customer_number": this.state.mobileMoneyNo,
                            "fullname": stringFullname,
                            "email_address": stringEmail,
                            "amount": totalPricing,
                            "product_id": stringIds,
                            "quantity": stringQuantities,
                            "user_id": userId,
                            "address": stringAddress,
                            "transaction_id": "",
                            "network_code": this.state.networkCode,
                            "status": "pending",
                            "existing_phonenumber": userPhonenumber,
                            "vodafone_code": this.state.vodafoneCode
 
                        }]
                    }]
                })
                // console.log(res.data);
                if(res.data.status_code == 609) {
                    Alert.alert('Order has been placed. Check your phone for prompt.')
                    await AsyncStorage.removeItem('carts')
                    Actions.home();
                }
                else {
                    Alert.alert('Cannot make order at this time. Please try again later.')
                    Actions.home()
                }
             
            }

        }catch(e){
            Alert.alert('Sorry an error occurred')
            console.log(e)
        }
         // const res = await axios.post(url, {headers: {'Devless-token': 'db30a4e6292bbfeb7e24d6abbe004642'}})
    }

    render(){
        console.log(this.state.networkCode)
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <CheckoutForm network={this.state.networkCode} type='Make payment' fields={this.state} onChange={this.onChange} onCheckout={this.onCheckout}/>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },
    textInput: {
        width: 300,
        backgroundColor: 'brown',
        borderRadius: 25,
        height: 40,
        paddingHorizontal:16, 
        color: '#ffffff',
        marginVertical: 10
    },
    button: {
        width:150,
        backgroundColor:'brown',
        borderRadius: 25,
        alignSelf: 'center',
        marginVertical: 10,
        paddingVertical: 13
      },
      buttonText: {
        fontSize:16,
        fontWeight:'500',
        color:'#ffffff',
        textAlign:'center'
    }
})

export default Checkout