import React, { Component } from 'react';
import axios from 'axios'
import { Text, StyleSheet, FlatList, View } from 'react-native';
import ProductList from './ProductList'

class Products extends Component {

  state = {
    data: [],
  }
  
  async componentWillMount(){
    const url = 'http://50.116.8.175/api/v1/service/rosefabrics/db?table=fabrics'
    const res = await axios.get(url, {headers: {'Devless-token': 'd463354149e3e51dd115ec140819e0a7'}})
    const resReversed = res.data.payload.results.reverse();
    this.setState({data:resReversed})
  }

  renderProducts = () => {
    return this.state.data.map((data, i) => {
      return (
       <ProductList
        key={i}
        {...data}
        onPressItem={() => this.props.handleSelect(data)}
       />
      )
     
    })
  }

  render() {
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
    flexWrap: 'wrap',
    paddingTop: 10
  }
})

export default Products