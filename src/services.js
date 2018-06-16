import { Permissions, Notifications } from 'expo';
import { AsyncStorage } from 'react-native';
import axios from 'axios';

const PUSH_ENDPOINT = 'http://50.116.8.175/api/v1/service/rosefabrics/db'
axios.defaults.headers.common['Devless-token'] = 'd463354149e3e51dd115ec140819e0a7';

export default async () => {
    
    const previousToken = await AsyncStorage.getItem('pushtoken')

    if(previousToken) {
        return 
    } else {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
          );
          let finalStatus = existingStatus;
       
          if (existingStatus !== 'granted') {
    
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
          }
        
          // Stop here if the user did not grant permissions
          if (finalStatus !== 'granted') {
            return;
          }
        
          // Get the token that uniquely identifies this device
          let token = await Notifications.getExpoPushTokenAsync();
          console.log(token)
        
        try{
            const res = await axios.post(PUSH_ENDPOINT, {
                "resource": [{
                    "name": "push_tokens",
                    "field": [{
                        "tokens": token
                    }]
                }]
            })
            console.log(res.data)
        } catch(e){
            console.log(e)
        }
       
        await AsyncStorage.setItem('pushtoken', token);
    }
};