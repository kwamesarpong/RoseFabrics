import React, { PureComponent } from 'react'
import { View,Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Icon } from 'native-base'
import { Actions } from "react-native-router-flux";
import { Card, Button } from 'react-native-elements'
import { AsyncStorage, Alert } from 'react-native'

class TailorDetails extends PureComponent {

    state = {
        quantity: 2,
        ig_account: '',
        location: '',
        name: '',
        img: ' ',
        id: ''
    }   

    componentDidMount() {
        this.setState({
            ig_account: this.props.data.ig_account,
            location: this.props.data.location,
            name: this.props.data.name,
            img: this.props.data.img_one,
            id: this.props.data.id
        })
    }


    render(){
        const { quantity, ig_account, location, name, img } = this.state
        return (
            <View style={{backgroundColor: 'white', height: '100%'}}>
                <Card containerStyle={styles.container} imageStyle={styles.image}
                    image={{uri: img}}>
                    <Text style={{marginBottom: 10, textAlign:'center', fontSize: 20, fontWeight: 'bold', color: '#ff0000'}}>
                        {name}
                    </Text>
                    <Text style={{marginBottom: 10, textAlign:'center'}}>{location}</Text>
                    <Text style={{marginBottom: 10, textAlign:'center'}}>
                        {ig_account}
                    </Text>
                    <View style={{ alignItems: 'center', marginBottom: 15 }}>
                        <View style={{ flexDirection: 'row', paddingTop: 10, alignItems: 'center' }}>
                            <Icon name='md-star' style={{color: 'red', fontSize: 20}} />
                            <Icon name='md-star' style={{color: 'red', fontSize: 20}} />
                            <Icon name='md-star' style={{color: 'red', fontSize: 20}} />
                            <Icon name='md-star' style={{color: 'red', fontSize: 20}} />
                        </View>
                    </View>
                    <Button
                        backgroundColor='red'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
                        title='Rate' 
                    />
                </Card>
            </View>
    
        )
    }
}
     


const styles  = StyleSheet.create({
   container: {
       marginTop: '10%',
       alignContent: 'center'
   },
   image: {
       width: '100%',
       height: 250
   }
})
export default TailorDetails