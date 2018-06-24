import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";

const  TransactionsList = (props) => (
      <View style={styles.listItem}>
        <Text>{props.delivery_date}</Text>
        <Text>{props.amount}</Text>
        <View style={{paddingTop: 10, borderBottomWidth: 1, borderBottomColor: 'brown'}}>
        </View>
      </View>
)
 

const styles = StyleSheet.create({
  listItem: {
    width: "100%",
    marginBottom: 5,
    padding: 10
  }
});

export default TransactionsList;
