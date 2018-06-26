import React, { Component } from 'react';
import axios from 'axios'
import { Text, StyleSheet, FlatList, View, ScrollView, ActivityIndicator, AsyncStorage } from 'react-native';
import TransactionsList from './TransactionsList'

class Transactions extends Component {

  state = {
    data: [],
    loading: true
  }
  
  async componentWillMount(){
    let userId = await AsyncStorage.getItem('user_id')
    const url = 'http://50.116.8.175/api/v1/service/rosefabrics/db?table=transaction&where=user_id,' + userId
    const res = await axios.get(url, {headers: {'Devless-token': 'd463354149e3e51dd115ec140819e0a7'}})
    const resReversed = res.data.payload.results.reverse();
    this.setState({
      data:resReversed,
      loading: false
    })
  }

  renderProducts = () => {
    return this.state.data.map((data, i) => {
      return (
        <TransactionsList
          key={i}
          {...data}
        />
      )
     
    })
  }

  render() {
    if(this.state.loading) {
      return (<View style={{alignItems: 'center', paddingTop: '50%', backgroundColor: '#ffffff', height: '100%'}}>
                <ActivityIndicator size="large" color='brown' />
              </View>)
      }
    return (
         <View style={styles.container}>
           {this.renderProducts()}
          </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row', 
    flexWrap: 'wrap'
  }
})

export default Transactions