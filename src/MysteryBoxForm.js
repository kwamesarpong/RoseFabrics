import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Picker } from 'react-native';

const MysteryBoxForm = ({type, fields, onChange, onSubmit}) => (
       <View
            behavior="padding"
            style={styles.container}
         >
        <Text style={{fontSize: 20, color: 'brown'}}>Mystery Box</Text>
        <Text style={{paddingTop: 10}}>Full Name</Text>
        <TextInput 
            placeholder='Full name'
            placeholderTextColor='#fff'
            style={styles.textInput}
            value={fields.contact_name}
            onChangeText={(val) => onChange('contact_name', val)}
            underlineColorAndroid='transparent' />
        <Text style={{paddingTop: 10}}>Gender</Text>
        <Picker
            selectedValue={fields.gender}
            style={{width: 300}}
            onValueChange={(val) => onChange('gender', val)}>
            <Picker.Item label="Select one" value='' />
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
        </Picker>
        <Text style={{paddingTop: 10}}>Package worth</Text>
        <Picker
            selectedValue={fields.worth}
            style={{width: 300}}
            onValueChange={(val) => onChange('worth', val)}>
            <Picker.Item label="Select one" value='' />
            <Picker.Item label="GHc 70 (6 yards)" value="6 yards" />
            <Picker.Item label="GHc 140 (12 yards)" value="12 yards" />
        </Picker>
        <Text style={{paddingTop: 10}}>What's your style?</Text>
        <Picker
            selectedValue={fields.style}
            style={{width: 300}}
            onValueChange={(val) => onChange('style', val)}>
            <Picker.Item label="Select one" value='' />
            <Picker.Item label="Bright Colors" value="Bright Colors" />
            <Picker.Item label="Midtone Colors" value="Midtone Colors" />
            <Picker.Item label="A bit of Both" value="A bit of Both" />
        </Picker>
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