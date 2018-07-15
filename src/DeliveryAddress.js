import React, { PureComponent } from 'react'
import { View, ScrollView, Text, AsyncStorage, KeyboardAvoidingView, Alert, TextInput, StyleSheet} from 'react-native'
import { Icon, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import Header from './Header'
import CartList from './CartList'
import CartForm from './CartForm'

class DeliveryAddress extends PureComponent {

    state = {
        carts: [],
        totalPricing: 0,
        productIdtb: [],
        productQtb: [],
        productNames: [],
        address: '',
        deliveryDate: '',
        deliveryCity: ''
    }

    onChange = (key, val) => {
        this.setState({[key]: val});
     }

    makeOrder = async() => {
        
        try {

            /* let stringIds = this.state.productIdtb;
            let stringQuantities = this.state.productQtb;
            let totalPricing = this.state.totalPricing;
            let stringProductNames = this.state.productNames;

            await AsyncStorage.setItem('ids', JSON.stringify(stringIds))
            await AsyncStorage.setItem('quantities', JSON.stringify(stringQuantities))
            await AsyncStorage.setItem('pnames', JSON.stringify(stringProductNames))
            await AsyncStorage.setItem('pricing', JSON.stringify(totalPricing)) */
            await AsyncStorage.setItem('address', JSON.stringify(this.state.address));
            await AsyncStorage.setItem('deliveryDate', JSON.stringify(this.state.deliveryDate));
            await AsyncStorage.setItem('deliveryCity', JSON.stringify(this.state.deliveryCity));

            Alert.alert('Proceeding to checkout.')
            Actions.invoice();

        }catch(e){
            Alert.alert('Sorry an error occurred')
            console.log(e)
        }
        
    }

    render(){
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <View style={{backgroundColor: 'white', paddingBottom: 300}}>
                    <Text style={{paddingTop: 20,paddingBottom:10,fontSize:16, alignSelf:'center',color: 'brown'}}>Enter Delivery Address</Text>
                    <CartForm fields={this.state} onChange={this.onChange} />
                    <View behavior="height" style={{flexDirection:'row', justifyContent:'center'}}>
                        
                      <Button onPress={this.makeOrder} backgroundColor='brown'>
                          <Text style={{color:'white', paddingLeft: 20, paddingRight:20}}>Proceed to checkout</Text>
                      </Button>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: 'gray',
        borderStyle: 'solid',
        borderWidth: 1,
        height: 100,
        alignSelf: 'center',
        fontSize: 16,
        color: 'black',
        marginVertical: 10
    },
})
export default DeliveryAddress