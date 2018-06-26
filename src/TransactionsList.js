import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";

const  TransactionsList = (props) => (
      <View style={styles.listItem}>
        <Text style={styles.dateItem}>Delivery Date: {props.delivery_date}</Text>
        <Text style={{paddingTop: 5}}>Amount Paid: {props.amount} GHC</Text>
        <Text style={{paddingTop: 5}}>Fabrics Bought: {props.product_names}</Text>
        <Text style={{paddingTop: 5}}>Quantities: {props.quantity}</Text>
        <View style={{paddingTop: 10, borderBottomWidth: 1, borderBottomColor: 'brown'}}>
        </View>
      </View>
)
 

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10
  },
  dateItem: {
    color: 'brown',
    fontSize: 18
  }
});

export default TransactionsList;
