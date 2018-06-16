import React, { PureComponent } from 'react'
import { View, StyleSheet, TouchableOpacity, Text, AsyncStorage, Alert } from 'react-native'
import ImagePicker from 'react-native-image-picker'
import axios from 'axios'


class Search extends PureComponent {

        state = {
            fname: '',
            lname: '',
            email: '',
            phone: ''
        }

      selectPhotoTapped = () => {
        const options = {
          quality: 1.0,
          maxWidth: 500,
          maxHeight: 500,
          storageOptions: {
            skipBackup: true
          }
        };
    
        ImagePicker.showImagePicker(options, (response) => {
          console.log('Response = ', response);
    
          if (response.didCancel) {
            console.log('User cancelled photo picker');
          }
          else if (response.error) {
            console.log('ImagePicker Error: ', response.error);
          }
          else if (response.customButton) {
            console.log('User tapped custom button: ', response.customButton);
          }
          else {
            let source = { uri: 'data:image/jpeg;base64,' + response.data };

            const url = 'http://50.116.8.175/api/v1/service/rosefabrics/db'
            axios.defaults.headers.common['Devless-token'] = 'd463354149e3e51dd115ec140819e0a7';

            try {
                var stringFName, stringLName, stringEmail, stringPNumber

                AsyncStorage.getItem('first_name')
                .then((data) => {
                    let parsedFName = JSON.parse(data)
                    stringFName = parsedFName.toString();
                    this.setState({ fname: stringFName })
                })

                AsyncStorage.getItem('last_name')
                .then((data) => {
                    let parsedLName = JSON.parse(data)
                    stringLName = parsedLName.toString();
                    this.setState({ lname: stringLName })
                })

                AsyncStorage.getItem('email')
                .then((data) => {
                    let parsedEmail = JSON.parse(data)
                    stringEmail = parsedEmail.toString();
                    this.setState({ email: stringEmail })
                })

                AsyncStorage.getItem('phone_number')
                .then((data) => {
                    let parsedPNumber = JSON.parse(data)
                    stringPNumber = parsedPNumber.toString();
                    this.setState({ phone: stringPNumber })
                })

                

                const searchParams = axios.post(url, {
                    "resource": [{
                        "name": "fabric_search",
                        "field": [{
                            "first_name": this.state.fname,
                            "last_name": this.state.lname,
                            "email": this.state.email,
                            "phone_number": this.state.phone,
                            "search_pic": source.uri
                        }]
                    }]
                })
                .then((data) => {
                    if(data.data.status_code === 609) {
                        Alert.alert('Success. We will contact you soon if the fabric is available.')
                    }
                    else {
                        Alert.alert('Please try again later')
                    }
                })


            } catch(e) {
                console.log(e)
            }

          }
        });
      }


    render(){
        return (
            <View style={{flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity style={{width: '100%', paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5}} onPress={this.selectPhotoTapped}>
                    <View style={{width: '100%', paddingTop: 10, paddingBottom: 10, alignItems: 'center', backgroundColor: '#f4f4f4'}}>
                        <Text>Tap here to search ... </Text>
                    </View>
                </TouchableOpacity>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    
})
export default Search;