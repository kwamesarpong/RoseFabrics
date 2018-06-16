import React from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';


const Logo =  () => (
    <View style={styles.container}>
        <Image style={{width:80, height:70}} source={require('../icon.png')} />
        <Text style={{color:'brown', fontSize: 18, paddingBottom: 30}}>Welcome to Rose Fabrics</Text>
    </View>
)


const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Logo