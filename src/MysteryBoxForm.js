import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const MysteryBoxForm = ({type, fields, onChange, onSubmit}) => (
       <View
            behavior="padding"
            style={styles.container}
         >
        <Text style={{fontSize: 20, color: 'brown'}}>Mystery Box</Text>
        <Text style={{paddingTop: 10}}>How often should we surprise you?</Text>
        <TextInput 
            placeholder='Weekly, Twice a month, Monthly'
            placeholderTextColor='#fff'
            style={styles.textInput}
            value={fields.interval}
            onChangeText={(val) => onChange('interval', val)}
            underlineColorAndroid='transparent' />
        <Text style={{paddingTop: 10}}>Package worth</Text>
        <TextInput 
            placeholder='Ghc 48, Ghc 70, Ghc 140'
            placeholderTextColor='#fff'
            style={styles.textInput}
            value={fields.worth}
            onChangeText={(val) => onChange('worth', val)}
            underlineColorAndroid='transparent' />
        <Text style={{paddingTop: 10}}>List your favourite colors</Text>
        <TextInput 
            placeholder='Your answer'
            placeholderTextColor='#fff'
            style={styles.textInput}
            value={fields.favourite_colours}
            onChangeText={(val) => onChange('favourite_colours', val)}
            underlineColorAndroid='transparent' />
        <Text style={{paddingTop: 10}}>What do you expect to see in the box?</Text>
        <TextInput 
            placeholder='Your answer'
            placeholderTextColor='#fff'
            style={styles.textInput}
            value={fields.expectation}
            onChangeText={(val) => onChange('expectation', val)}
            underlineColorAndroid='transparent' />
        <Text style={{paddingTop: 10}}>Contact name</Text>
        <TextInput 
            placeholder='Your name'
            placeholderTextColor='#fff'
            style={styles.textInput}
            value={fields.contact_name}
            onChangeText={(val) => onChange('contact_name', val)}
            underlineColorAndroid='transparent' />
        <Text style={{paddingTop: 10}}>Age</Text>
        <TextInput 
            placeholder='Your age'
            placeholderTextColor='#fff'
            style={styles.textInput}
            value={fields.age}
            onChangeText={(val) => onChange('age', val)}
            underlineColorAndroid='transparent' />
        <Text style={{paddingTop: 10}}>Contact number</Text>
        <TextInput 
            placeholder='Phone number'
            placeholderTextColor='#fff'
            style={styles.textInput}
            value={fields.contact_number}
            onChangeText={(val) => onChange('contact_number', val)}
            underlineColorAndroid='transparent' />
        <Text style={{paddingTop: 10}}>Delivery Address</Text>
        <TextInput 
            placeholder='Your address'
            placeholderTextColor='#fff'
            style={styles.textInput}
            value={fields.address}
            onChangeText={(val) => onChange('address', val)}
            underlineColorAndroid='transparent' />
        
          <TouchableOpacity onPress={onSubmit} style={styles.button}>
             <Text style={styles.buttonText}>{type}</Text>
           </TouchableOpacity>   
        </View>
)

const styles = StyleSheet.create({
    container: {
        paddingTop: 10,
        paddingBottom: 300,
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
    }
})
export default MysteryBoxForm