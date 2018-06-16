import React, { PureComponent } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { Icon } from 'native-base'

const  CartList = (props) => (
        <ScrollView contentContainerStyle={styles.listItem}>
          <Image source={{uri: props.img}} style={{width: '10%', height: 50}} />
          <Text>Product: {props.name}</Text>
          <Text>Quantity: {props.quantity} </Text>
          <Text>Price: {props.price}</Text>
          <TouchableOpacity onPress={() => props.handleRemove(props.id)}>
            <Icon name='ios-remove-circle' style={{color: 'red'}} />
          </TouchableOpacity>
        </ScrollView>
)
 

const styles = StyleSheet.create({
  listItem: {
    flexDirection:'row',
    justifyContent: 'space-between',
    width: "100%",
    marginBottom: 5,
    padding: 10,
    alignItems: "center"
  }
});

export default CartList