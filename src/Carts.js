import React, { PureComponent } from 'react'
import { View, ScrollView, Text, AsyncStorage, KeyboardAvoidingView, Alert, TextInput, StyleSheet} from 'react-native'
import { Icon, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import Header from './Header'
import CartList from './CartList'

class Carts extends PureComponent {

    state = {
        carts: [],
        totalPricing: 0,
        productIdtb: [],
        productQtb: [],
        productNames: [],
        address: '',
        deliveryDate: ''
    }

    async componentDidMount () {
        try {
            const cart = await AsyncStorage.getItem('carts')
            const cartsParsed = JSON.parse(cart);
            // await AsyncStorage.removeItem('carts')

            let product_ids = [];
            let product_quantity = [];
            let product_names = [];
            let totalCost = 0;

            cartsParsed.forEach(async(data) => {
                product_ids.push(data.id);
                product_quantity.push(data.quantity);
                product_names.push(data.name)

                totalCost += (data.price * data.quantity)
            })

            this.setState({
                carts: cartsParsed,
                totalPricing: totalCost,
                productIdtb: product_ids,
                productQtb: product_quantity
            });

        } catch (e) {
            console.log(e)
        }
    }

    handleRemove = async (id) => {
        try {
            
            const newList =  this.state.carts.filter(item => item.id !== id )
            await this.setState({
                carts: newList,
                productQtb: this.state.productQtb.filter(item =>  item !== id),
                productIdtb: this.state.productIdtb.filter(item =>  item !== id),
                productNames: this.state.productNames.filter(item =>  item !== id),
                totalPricing: totalCost
            });
            let totalCost = 0
            this.state.carts.forEach(async(data) => {
                totalCost += (data.price * data.quantity)
            })
            this.setState({totalPricing: totalCost})

            if(this.state.carts.length === 0){
                await AsyncStorage.removeItem('carts')
                return Actions.home()
            }
            Alert.alert('Product removed from cart')
            return await AsyncStorage.setItem('carts', JSON.stringify(this.state.carts))
        } catch (e) {
            console.log(e)
        }    
    }

    renderCarts = () => {
        if(this.state.carts && this.state.carts.length > 0) {
            return this.state.carts.map((data,id) => {
                return (
                    <CartList key={id} 
                        {...data}
                        handleRemove={this.handleRemove}
                     />
                )
            })
        }
    }

    onChange = (key, val) => {
        this.setState({[key]: val})
     }

    makeOrder = async() => {
        
        try {

            let stringIds = this.state.productIdtb;
            let stringQuantities = this.state.productQtb;
            let totalPricing = this.state.totalPricing;
            let stringProductNames = this.state.productNames;

            await AsyncStorage.setItem('ids', JSON.stringify(stringIds))
            await AsyncStorage.setItem('quantities', JSON.stringify(stringQuantities))
            await AsyncStorage.setItem('pnames', JSON.stringify(stringProductNames))
            await AsyncStorage.setItem('pricing', JSON.stringify(totalPricing))
            // await AsyncStorage.setItem('address', JSON.stringify(this.state.address))
            // await AsyncStorage.setItem('deliveryDate', JSON.stringify(this.state.deliveryDate))

            Actions.deliveryaddress();

        }catch(e){
            Alert.alert('Sorry an error occurred')
            console.log(e)
        }
        
    }

    render(){
        const { carts } = this.state
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <View style={{backgroundColor: 'white', paddingBottom: 300}}>
                    <Text 
                        style={{textAlign:'center',
                        color:'brown',fontWeight:'bold'}}
                    >
                        {carts && carts.length > 0 ? 'Your Cart' : 'Nothing in Cart'}
                    </Text>
                    {this.renderCarts()}
                    <Text style={{paddingTop: 10,paddingBottom:10,fontSize:16, alignSelf:'center', marginBottom: 20}}>Total Cost: {this.state.totalPricing} ghc</Text>
                    <View behavior="height" style={{flexDirection:'row', justifyContent:'center'}}>
                        {carts && carts.length > 0 &&  
                        <Button onPress={this.makeOrder} backgroundColor='brown'>
                            <Text style={{color:'white', paddingLeft: 20, paddingRight:20}}>Proceed to Delivery Address</Text>
                        </Button>}
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
export default Carts