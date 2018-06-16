import React, { PureComponent } from 'react'
import { View,Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Icon } from 'native-base'
import { Actions } from "react-native-router-flux";
import { Card, Button } from 'react-native-elements'
import { AsyncStorage, Alert } from 'react-native'

class ProductDetails extends PureComponent {

    state = {
        quantity: 2 ,
        price: '',
        name: '',
        desc: '',
        img: ' ',
        id: ''
    }   

    componentDidMount() {
        this.setState({
            price: this.props.data.price,
            name: this.props.data.name,
            desc: this.props.data.desc,
            img: this.props.data.img_one,
            id: this.props.data.id
        })
    }


    // Adding product to cart

    handleCart  =  async(product) => {
        let carts = []
        try {
            if (await AsyncStorage.getItem('carts')) {
                let res = await AsyncStorage.getItem('carts')
                const cartData = JSON.parse(res)

                let checkForMatch = cartData.find(element => {
                    return element.id === product.id
                });

                if (checkForMatch === undefined) {
                    cartData.push(product)
                    AsyncStorage.setItem('carts', JSON.stringify(cartData))
                    Alert.alert('Product has been added succesfully');
                }
                else {
                    Alert.alert('Product already in cart')
                }

            }
            else {
                carts.push(product);
                AsyncStorage.setItem('carts', JSON.stringify(carts))
                Alert.alert('Product has been added successfully')
            }
        }
        catch(e){
            console.log(e)
        }
    }

    // Handling Increase quantity
    onIncrease = () => {    
        this.setState({quantity: this.state.quantity + 1})
    }

     // Handling Decrease quantity
    onDecrease = () => {
        if(this.state.quantity <= 2){
            return false
        }
         this.setState({quantity: this.state.quantity- 1}) 
    }

    render(){
        const { quantity, price, name, desc, img } = this.state
        return (
            <ScrollView>
                <View style={{backgroundColor: 'white', height: '100%', paddingBottom: 30}}>
                    <Card containerStyle={styles.container} imageStyle={styles.image}
                        image={{uri: img}}>
                        <Text style={{marginBottom: 10, textAlign:'center', fontSize: 20}}>
                            {name}
                        </Text>
                        <Text style={{marginBottom: 10, textAlign:'center', fontSize: 17}}>
                            Ghc {price}
                        </Text>
                        <Text style={{marginBottom: 10, textAlign:'center', color: '#a1a1a1'}}>
                            {desc}
                        </Text>
                        <View style={{flexDirection:'row', justifyContent:'space-around',paddingTop:'10%', paddingBottom:'10%'}}>
                            <Icon style={{marginLeft: '20%'}} name='ios-remove-circle' onPress={this.onDecrease} />
                                <Text>Quantity: {quantity}</Text>
                            <Icon style={{marginRight: '20%'}} name='ios-add-circle' onPress={this.onIncrease} />
                        </View>
                        <Button
                            backgroundColor='red'
                            onPress={(product) => this.handleCart(this.state)}
                            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                            title='ADD TO CART' 
                        />
                    </Card>
                </View>
            </ScrollView>
    
        )
    }
}
     


const styles  = StyleSheet.create({
   container: {
       marginTop: '10%',
       alignContent: 'center'
   },
   image: {
       width: '100%',
       height: 400
   }
})
export default ProductDetails