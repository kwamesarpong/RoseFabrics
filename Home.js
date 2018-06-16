import React, { PureComponent } from 'react';
import { ScrollView,View, StyleSheet, Text, Image, TextInput, Dimensions, Button, TouchableOpacity } from 'react-native';

class Home extends PureComponent {

    onPress = () => {
      alert('Thanks for subscribing!')
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.navBar}>
                    <Text>Dash</Text>
                    <Image source={require('./log.jpeg')} style={{width:'40%',height:18}} />
                    <Text>Cart</Text>
                </View>
                <View style={styles.searchBar}>
                    <TextInput placeholder='Search' underlineColorAndroid='transparent' /> 
                </View>
                <Image style={styles.slider} source={require('./slider.jpeg')} />
                <View style={styles.smallBox}>
                    <Text style={styles.box}>MYSTERY BOX</Text>
                    <Text style={{fontSize:11.5, color:'#A2473E'}}>PERIODIC DELIVERY OF FABRICS</Text>
                     <TouchableOpacity onPress={this.onPress}>
                        <Text style={styles.subButton}>SUBSCRIBE</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.productContainer}>
                    <Text style={styles.product}>B243</Text>
                    <Text style={styles.price}>GHc 12</Text>
                </View>
            </View>
        )
    }
}

const styles =  StyleSheet.create({
    container: {
        flex: 1,
    },
    navBar: {
        height: 50,
        backgroundColor: 'white',
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    searchBar: {
        width: '95%',
        height: 40,
        backgroundColor: '#EBE5E5',
        borderColor:'#EBE5E5',
        borderStyle: 'solid',
        borderWidth: 1,
        alignSelf: 'center'
    },
    slider: {
        marginTop: 5,
        width: Dimensions.get('window') * 0.9,
        height: 200,
    },
    smallBox: {
        marginTop: 5,
        height: 60,
        backgroundColor: '#FEFEFE',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        fontSize: 10,
        fontWeight: 'bold',
        color: '#A2473E'
    },
    subButton: {
        backgroundColor: '#B51500',
        color: 'white',
        fontSize: 11.5,
        textAlign: 'center',
        fontWeight: 'bold',
        borderRadius: 5,
        width: 90,
        marginTop: 2
    },
    productContainer: {
       // flexDirection: 'row',
       flex: 1,
    //    alignItems: 'center',
    //    borderStyle: 'solid',
    //    borderWidth: 3,
    // height: 40,
    // width: 100,
    //borderWidth: 100,
    borderColor: 'red',
    borderStyle:'solid'
    },

    // product: {
    //    borderWidth:2,
    //    borderStyle: 'solid',
    //    textAlign: 'center'
    // },
    // price: {
    //     borderWidth:2,
    //     borderStyle: 'solid',
        
    // }
})

export default Home;