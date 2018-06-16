import React, { PureComponent }  from 'react'
import { View, Image, StyleSheet, TouchableOpacity, Text} from 'react-native'
import axios from 'axios'
import { Actions } from 'react-native-router-flux'


class Selection extends PureComponent{

    state = {
        dealImg: ' ',
        mysteryImg: ' '
      }

    async componentDidMount() {
    
        const url = 'http://50.116.8.175/api/v1/service/rosefabrics/db?table=deal_slider'
        const res = await axios.get(url, {headers: {'Devless-token': 'd463354149e3e51dd115ec140819e0a7'}})
        let dealImage = res.data.payload.results;
        let dealArray = dealImage.reverse();
    
        const url1 = 'http://50.116.8.175/api/v1/service/rosefabrics/db?table=mystery_box_slider'
        const res1 = await axios.get(url1, {headers: {'Devless-token': 'd463354149e3e51dd115ec140819e0a7'}})
        let mysteryImage = res1.data.payload.results;
        let mysteryArray = mysteryImage.reverse();
    
        this.setState({
          dealImg: dealArray[0].image,
          mysteryImg: mysteryArray[0].image
        })
        
      }


    render(){
        return (
            <View>
                <View style={styles.container}>
                    <TouchableOpacity style={{width: '100%'}} onPress={() => Actions.dealshome()}>
                        <Image source={{uri: this.state.dealImg}} style={{width:'100%', height: 40}} />
                    </TouchableOpacity>
                </View>
                <View style={styles.container}>
                    <TouchableOpacity style={{width: '100%'}} onPress={() => Actions.mysterybox()}>
                        <Image source={{uri: this.state.mysteryImg}} style={{width:'100%', height: 40}} />
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
} 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'row',
        paddingTop: 10,
        paddingBottom: 10,
        borderBottomWidth:1,
        borderBottomColor: 'white',
        elevation: 5,
        backgroundColor:'white'
    },
    touch: {
        flexDirection:'row',
        justifyContent: 'space-around',
        width: '70%'
    }
})

export default Selection