import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";

const  TransactionsList = (props) => (
      <View style={styles.listItem}>
        <Text style={styles.dateItem}>Delivery Date: {props.delivery_date}</Text>
        <Text>Amount Paid: {props.amount} GHC</Text>
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
