import React, { PureComponent } from 'react'
import { View, ScrollView, Text, AsyncStorage, KeyboardAvoidingView, Alert, TextInput, StyleSheet} from 'react-native'
import { Icon, Button } from 'native-base'
import { Actions } from 'react-native-router-flux'
import axios from 'axios'
import Header from './Header'
import CartList from './CartList'
import CartForm from './CartForm'

class Invoice extends PureComponent {

    state = {
        totalPricing: 0,
        deliveryCity: '',
        deliveryCityCost: 0,
        totalCost: 0
    }

      async componentDidMount () {
          try {
            let totalPricing = await AsyncStorage.getItem('pricing');
            let parsedPricing = JSON.parse(totalPricing);

            let deliveryCity = await AsyncStorage.getItem('deliveryCity');
            let parsedDeliveryCity = JSON.parse(deliveryCity);
            let stringDeliveryCity = parsedDeliveryCity.toString();

            this.setState({ totalPricing: totalPricing });

            if(stringDeliveryCity === "OutsideAccra") {
              let totalCost = parsedPricing + 20;
              this.setState({
                deliveryCityCost: 20,
                totalCost: totalCost
              });
            }
            else {

                if(parsedPricing < 60) {
                    parsedPricing = parsedPricing + 20;
                    this.setState({
                        totalCost: parsedPricing,
                        deliveryCityCost: 20
                    });
                }
                else {
                    this.setState({
                        deliveryCityCost: 0,
                        totalCost: parsedPricing
                    });
                }
            }

          } catch (e) {
              console.log(e)
          }
      }

      onChange = (key, val) => {
        this.setState({[key]: val})
      }

     makeOrder = async() => {
        
      try {

          await AsyncStorage.setItem('deliveryCity', JSON.stringify(this.state.deliveryCity));
          await AsyncStorage.setItem('pricing', JSON.stringify(this.state.totalCost));

          Alert.alert('Proceeding to checkout.')
          Actions.checkout();

      }catch(e){
          Alert.alert('Sorry an error occurred')
          console.log(e)
      }
      
    }

    render(){
        return (
            <ScrollView style={{backgroundColor: 'white'}}>
                <View style={{backgroundColor: 'white', paddingBottom: 300}}>
                    <Text style={{paddingTop: 20,paddingBottom:20,fontSize:16, alignSelf:'center',color: 'brown'}}>Invoice</Text>

                    <View behavior="height" style={{alignItems:'center', backgroundColor: '#fafafa',paddingTop: 10, paddingBottom: 10}}>

                      <Text style={{color: 'brown',paddingBottom:10}}>Cost of Items ................ GHc {this.state.totalPricing}</Text>

                      <Text style={{color: 'brown',paddingBottom:10}}>Cost of Delivery ................ GHc {this.state.deliveryCityCost}</Text>
                    </View>

                    <View style={{alignItems:'center', paddingTop: 10, paddingBottom: 10}}>
                      <Text style={{color: 'brown'}}>Total: GHc {this.state.totalCost}</Text>
                    </View>

                    <View style={{alignItems:'center', paddingTop: 10, paddingBottom: 10}}>
                      <Button onPress={this.makeOrder} backgroundColor='brown' style={{alignSelf: 'center'}}>
                          <Text style={{color:'white', paddingLeft: 20, paddingRight:20}}>Proceed to checkout</Text>
                      </Button>
                    </View>

                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    textInput: {
        width: 300,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderColor: 'gray',
        borderStyle: 'solid',
        borderWidth: 1,
        height: 100,
        alignSelf: 'center',
        fontSize: 16,
        color: 'black',
        marginVertical: 10
    },
})
export default Invoice