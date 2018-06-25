import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

const CartForm = ({fields, onChange}) => (
        /* <View
            behavior="padding"
            style={styles.container}
         > */
        <TextInput 
            placeholder='Your Address'
            placeholderTextColor='gray'
            multiline
            style={styles.textInput}
            value={fields.address}
            onChangeText={(val) => onChange('address', val)}
            underlineColorAndroid='transparent' />

        // </View>
)

const styles = StyleSheet.create({
    /* container: {
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    }, */
    textInput: {
        width: 300,
        backgroundColor: '#fff',
        borderColor: 'brown',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        height: 100,
        alignSelf: 'center',
        paddingHorizontal:16, 
        fontSize: 16,
        color: '#000000',
        marginVertical: 10
    }
})
export default CartForm