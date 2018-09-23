import React, { PureComponent } from 'react'
import { View,Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView } from 'react-native';
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
        if(this.state.quantity == '') {
            Alert.alert('Please type a quantity')
        }
        else {

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
                        <View style={{ paddingTop:'10%', paddingBottom:'10%'}}>
                            <View style={{paddingBottom: 10, alignContent: 'center'}}>
                                <Text style={{alignSelf: 'center'}}>Your quantity: {quantity}</Text>
                            </View>
                            <KeyboardAvoidingView
                                behavior="padding"
                                style={{alignContent: 'center'}}>
                                <TextInput 
                                    placeholder='Enter quantity, e.g 3'
                                    placeholderTextColor='gray'
                                    keyboardType='numeric'
                                    style={styles.textInput}
                                    onChangeText={(quantity) => this.setState({ quantity })}
                                    underlineColorAndroid='transparent' />
                            </KeyboardAvoidingView>
                            <Text style={{alignSelf: 'center'}}>Pieces</Text>
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
   },
   textInput: {
        width: 200,
        borderRadius: 5,
        borderColor: 'brown',
        borderStyle: 'solid',
        borderWidth: 1,
        height: 40,
        paddingHorizontal:16, 
        fontSize: 16,
        marginVertical: 10,
        alignSelf: 'center'
    }
})
export default ProductDetails