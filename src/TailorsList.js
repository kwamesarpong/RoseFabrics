import React, { PureComponent } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Linking, Image } from "react-native";
import { Icon } from 'native-base';
import { Button } from 'react-native-elements'

const  TailorsList = (props) => (
        <View style={styles.tailorItem}>
          <Image source={{uri:props.img_one}} style={{width: '30%', height: 150, borderWidth: 1, borderColor: 'brown'}} />
          <View style={styles.nameItem}>
            <Text style={{fontSize: 20, fontWeight: 'bold', color: 'brown'}}>{props.name}</Text>
            <Text>{props.location}</Text>
            <View style={{ flexDirection: 'row', paddingTop: 10 }}>
              <Icon name='md-star' style={{color: 'brown', fontSize: 16}} />
              <Icon name='md-star' style={{color: 'brown', fontSize: 16}} />
              <Icon name='md-star' style={{color: 'brown', fontSize: 16}} />
              <Icon name='md-star' style={{color: 'brown', fontSize: 16}} />
            </View>
            <View style={{paddingTop: 20}}>
              <Button
                  backgroundColor='brown'
                  buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                  title='Call now'
                  onPress={() => Linking.openURL('tel:+' + props.phone)}
              />
            </View>
          </View>
          <View style={styles.socialItem}>
            <Icon name='logo-instagram' 
                  style={{paddingBottom: 10, color: 'white'}} 
                  onPress={() => Linking.openURL(props.ig_account)} />
            <Icon name='logo-facebook' 
                  style={{paddingBottom: 10, color: 'white'}}
                  onPress={() => Linking.openURL(props.facebook)} />
            <Icon name='logo-twitter' 
                  style={{paddingBottom: 10, color: 'white'}} 
                  onPress={() => Linking.openURL(props.twitter)} />
          </View>
        </View>
)
 

const styles = StyleSheet.create({
  tailorItem: {
    flexDirection:'row',
    width: '100%',
    marginBottom: 5,
    alignItems: 'center',
    backgroundColor: '#fafafa',
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 2
  },
  nameItem: {
    width: '50%',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    alignItems: 'center',
    height: 150,
  },
  socialItem: {
    width: '20%',
    backgroundColor: 'brown',
    borderRadius: 5,
    alignItems: 'center',
    height: 150,
    paddingTop: 15
  }
});

export default TailorsList;
