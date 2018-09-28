import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Picker, TouchableOpacity, KeyboardAvoidingView } from 'react-native';

const CheckoutForm = ({network, type, fields, onChange, onCheckout}) => (
       <KeyboardAvoidingView
            behavior="padding"
            style={styles.container}
         >
        <Text style={{fontSize: 20, color: 'brown', alignSelf: 'center'}}>Make payment</Text>
        <Text style={{paddingTop: 10, alignSelf: 'center', marginBottom: 20}}>Choose your network</Text>
        {/* <TextInput 
            placeholder='Network'
            placeholderTextColor='#fff'
            style={styles.textInput}
            value={fields.interval}
            onChangeText={(val) => onChange('networkCode', val)}
            underlineColorAndroid='transparent' /> */}
        <Picker
            selectedValue={network}
            style={styles.pickerStyle}
            onValueChange={(item) => onChange('networkCode', item)}>
            <Picker.Item label="Payment method" value='' />
            <Picker.Item label="MTN Mobile Money" value="MTN" />
            <Picker.Item label="Airtel Money" value="AIR" />
            <Picker.Item label="Vodafone Cash" value="VOD" />
            <Picker.Item label="Tigo Cash" value="TIG" />
            <Picker.Item label="Cash on delivery" value="COD" />
        </Picker>
        <Text style={{paddingTop: 20, paddingLeft: 30, paddingRight: 30, alignSelf: 'center'}}>Enter vodafone voucher code (For vodafone cash users only)</Text>
        <TextInput 
            placeholder='Voucher code'
            placeholderTextColor='#fff'
            keyboardType='numeric'
            style={styles.textInput}
            value={fields.vodafoneCode}
            onChangeText={(item) => onChange('vodafoneCode', item)}
            underlineColorAndroid='transparent' />
        <Text style={{paddingTop: 20, paddingLeft: 30, paddingRight: 30, alignSelf: 'center'}}>Type the phone number you want to use for the payment</Text>
        <TextInput 
            placeholder='0240123456'
            placeholderTextColor='#fff'
            keyboardType='numeric'
            style={styles.textInput}
            value={fields.mobileMoneyNo}
            onChangeText={(item) => onChange('mobileMoneyNo', item)}
            underlineColorAndroid='transparent' />
        
          <TouchableOpacity onPress={onCheckout} style={styles.button}>
             <Text style={styles.buttonText}>{type}</Text>
           </TouchableOpacity>   
        </KeyboardAvoidingView>
)

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#ffffff'
    },
    textInput: {
        width: 300,
        backgroundColor: 'brown',
        borderRadius: 25,
        height: 40,
        paddingHorizontal:16, 
        fontSize: 16,
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
    },
    pickerStyle: {
        width: 300,
        backgroundColor: 'brown',
        borderRadius: 5,
        color: '#ffffff'
    }
})
export default CheckoutForm