import React, { PureComponent } from "react";
import { View, Text, StyleSheet } from "react-native";

const  NotificationsList = (props) => (
      <View style={styles.listItem}>
        <Text style={{ color: 'brown', fontSize: 18}}>{props.title}</Text>
        <Text>{props.message}</Text>
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

export default NotificationsList;
