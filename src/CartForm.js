import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, Picker, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-datepicker'

const CartForm = ({fields, onChange}) => (
        <KeyboardAvoidingView
            behavior="padding"
            style={styles.container}>
            <TextInput 
                placeholder='Your Address'
                placeholderTextColor='#fff'
                multiline
                style={styles.textInput}
                value={fields.address}
                onChangeText={(val) => onChange('address', val)}
                underlineColorAndroid='transparent' />

            <Picker
                selectedValue={fields.deliveryCity}
                style={styles.pickerStyle}
                onValueChange={(val) => onChange('deliveryCity', val)}>
                <Picker.Item label="City of Residence" value='' />
                <Picker.Item label="Accra or Tema" value="AccraOrTema" />
                <Picker.Item label="Outside Accra" value="OutsideAccra" />
            </Picker>

            <Text style={{paddingTop: 20,paddingBottom:10,fontSize:16, alignSelf:'center',color: 'brown'}}>Delivery Date</Text>

            <DatePicker
                style={styles.deliveryDate}
                date={fields.deliveryDate}
                mode="date"
                placeholder="Select Date"
                format="DD-MM-YYYY"
                minDate="01-01-2018"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                },
                dateInput: {
                    marginLeft: 36
                }
                }}
                onDateChange={(val) => onChange('deliveryDate', val)}
            />

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
        borderColor: 'brown',
        borderStyle: 'solid',
        borderWidth: 1,
        borderRadius: 5,
        height: 100,
        alignSelf: 'center',
        paddingHorizontal:16, 
        fontSize: 16,
        color: '#fff',
        marginVertical: 10
    },
    deliveryDate: {
        width: 300,
        borderRadius: 5,
        alignSelf: 'center',
        marginVertical: 10
    },
    pickerStyle: {
        width: 300,
        backgroundColor: 'brown',
        borderRadius: 5,
        color: '#ffffff'
    }
})
export default CartForm