import React, { PureComponent } from 'react';
import { ScrollView,View, StyleSheet, Text, Image, TextInput, Dimensions, Button, TouchableOpacity } from 'react-native';

class Magic extends PureComponent {

    render(){
        return (
            <View style={{flex:1}}>
                <View style={styles.smallBox}>
                    <Text style={styles.box}>Fabrics</Text>
                </View>
            </View>
        )
    }
}

const styles =  StyleSheet.create({
    smallBox: {
        marginTop: 5,
        height: 60,
        backgroundColor: '#FEFEFE',
        elevation: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    box: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#A2473E'
    }
})

export default Magic;