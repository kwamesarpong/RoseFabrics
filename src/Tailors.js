import React, { Component } from 'react';
import axios from 'axios'
import { Text, StyleSheet, FlatList, View, ScrollView, ActivityIndicator, Picker, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native';
import TailorsList from './TailorsList'

class Tailors extends Component {

  state = {
    data: [],
    loading: true,
    filter: '',
    locationText: '',
    showTextInput: false
  }

  async componentWillMount(){
    const url = 'http://50.116.8.175/api/v1/service/rosefabrics/db?table=tailors';
    const res = await axios.get(url, {headers: {'Devless-token': 'd463354149e3e51dd115ec140819e0a7'}});
    const resReversed = res.data.payload.results.reverse();
    this.setState({
      data:resReversed,
      loading: false
    })
  }

  pullTailors = async() => {

    this.setState({ loading: true });

    if(this.state.filter === '' && this.state.locationText === '') {
      Alert.alert('Please select a field!');
      this.setState({ loading: false });
    }
    else {
      if(this.state.locationText !== '') {

        const locUrl = 'http://50.116.8.175/api/v1/service/rosefabrics/db?table=tailors&where=location,' + this.state.locationText;
        const res = await axios.get(locUrl, {headers: {'Devless-token': 'd463354149e3e51dd115ec140819e0a7'}});
        const resReversed = res.data.payload.results.reverse();
        this.setState({
          data:resReversed,
          loading: false
        });

      }
      else {
        if(this.state.filter === 'Unisex') {

          const uniUrl = 'http://50.116.8.175/api/v1/service/rosefabrics/db?table=tailors';
          const res = await axios.get(uniUrl, {headers: {'Devless-token': 'd463354149e3e51dd115ec140819e0a7'}});
          const resReversed = res.data.payload.results.reverse();
          this.setState({
            data:resReversed,
            loading: false
          });

        }
        else if(this.state.filter === 'Men') {

          const menUrl = 'http://50.116.8.175/api/v1/service/rosefabrics/db?table=tailors&where=gender,male';
          const res = await axios.get(menUrl, {headers: {'Devless-token': 'd463354149e3e51dd115ec140819e0a7'}});
          const resReversed = res.data.payload.results.reverse();
          this.setState({
            data:resReversed,
            loading: false
          });

        }
        else if(this.state.filter === 'Women') {

          const womUrl = 'http://50.116.8.175/api/v1/service/rosefabrics/db?table=tailors&where=gender,female';
          const res = await axios.get(womUrl, {headers: {'Devless-token': 'd463354149e3e51dd115ec140819e0a7'}});
          const resReversed = res.data.payload.results.reverse();
          this.setState({
            data:resReversed,
            loading: false
          });

        }
      }

    }

    
  }

  renderProducts = () => {
    return this.state.data.map((data, i) => {
      return (
        <TailorsList
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
        <View>
          <View style={{ paddingTop: 20, paddingBottom: 10, paddingLeft: 40, paddingRight: 40, flexDirection: 'row' }}>
            <View style={{ width: '70%' }}>
              <Picker
                selectedValue={this.state.filter}
                onValueChange={
                  (itemValue) => {
                    if(itemValue === 'Location') {
                      this.setState({
                        filter: '',
                        showTextInput: true
                      });
                    }
                    else {
                      this.setState({
                        filter: itemValue,
                        showTextInput: false
                      });
                    }
                }}>
                  <Picker.Item label="Select by" value='' />
                  <Picker.Item label="Unisex" value="Unisex" />
                  <Picker.Item label="Men" value="Men" />
                  <Picker.Item label="Women" value="Women" />
                  <Picker.Item label="Location" value="Location" />
              </Picker>
            </View>
            <View style={{ width: '30%' }}>
              <TouchableOpacity
                style={{ width: '90%', backgroundColor: 'brown', paddingTop: 10,paddingBottom: 10, alignItems: 'center' }}
                activeOpacity={ 0.7 }
                onPress={this.pullTailors}>
                <Text style={{ color: '#fff' }}>Show</Text>
              </TouchableOpacity>
            </View>
          </View>

          {
            this.state.showTextInput ? (
              <View style={{ paddingBottom: 20, paddingLeft: 40, paddingRight: 40 }}>
                <KeyboardAvoidingView behavior="padding">
                  <TextInput
                    placeholder='Location'
                    placeholderTextColor='#fff'
                    style={styles.textInput}
                    onChangeText={(locationText) => this.setState({ locationText })}
                    underlineColorAndroid='transparent' />
                </KeyboardAvoidingView>
              </View>
            ) : (
              null
            )
          }

          <View style={styles.container}>
           {this.renderProducts()}
          </View>
        </View>
          
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1, 
    flexDirection: 'row', 
    flexWrap: 'wrap'
  },
  textInput: {
      backgroundColor: 'brown',
      height: 40,
      paddingHorizontal: 16, 
      fontSize: 16,
      color: '#ffffff',
      marginVertical: 10
  }
})

export default Tailors