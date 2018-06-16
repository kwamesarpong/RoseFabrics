import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import Logo from './Logo'

const Form = ({type, fields, onChange, onSubmit}) => (
    //    <KeyboardAvoidingView
    //         behavior="position"
    //         style={styles.container}
    //      >
        <View>
        <Logo />
        {type === 'Signup' && (
          <View>
            <TextInput 
                placeholder='First Name'
                placeholderTextColor='#fff'
                style={styles.textInput}
                value={fields.firstName}
                onChangeText={(val) => onChange('firstName', val)}
                underlineColorAndroid='transparent' />

            <TextInput 
                placeholder='Last Name'
                placeholderTextColor='#fff'
                style={styles.textInput}
                value={fields.lastName}
                onChangeText={(val) => onChange('lastName', val)}
                underlineColorAndroid='transparent' />

            <TextInput 
                placeholder='Phone Number'
                placeholderTextColor='#fff'
                style={styles.textInput} 
                keyboardType='numeric'
                value={fields.phone}
                onChangeText={(val) => onChange('phone', val)}
                underlineColorAndroid='transparent' />
         </View>
        )
       }
        <TextInput 
            placeholder='Email'
            placeholderTextColor='#fff'
            style={styles.textInput} 
            keyboardType='email-address'
            value={fields.email}
            onChangeText={(val) => onChange('email', val)}
            underlineColorAndroid='transparent' />
         <TextInput 
            placeholder='Password'
            secureTextEntry
            placeholderTextColor='#fff'
            value={fields.password}
            onChangeText={(val) => onChange('password', val)}
            style={styles.textInput} 
            underlineColorAndroid='transparent' />
          <TouchableOpacity disabled={fields.password === '' && fields.email=== ''} onPress={onSubmit} style={styles.button}>
             <Text style={styles.buttonText}>{type}</Text>
           </TouchableOpacity>
        </View>
    /* </KeyboardAvoidingView> */
)

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
export default Form