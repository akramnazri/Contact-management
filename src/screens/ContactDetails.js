import * as React from 'react';
import { ActivityIndicator, Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {useState, useEffect, Component} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setId,deleteId } from '../redux/actions';
import { Avatar, Image } from 'react-native-elements';


const ContactDetails = ({route, navigation}) => {
    const { id } = useSelector(state=>state.userReducer);
    const dispatch = useDispatch();
    const { contactData } = route.params;
    const [details, setDetails] = useState(false);

    let getContactData = (data, property) => {
        if (data) {
          return data.map((data, index) => {
            return (
              <View key={index}>
                <Text  style={styles.text}>{data.label}: {data[property]}</Text>
              </View>
            )
          });
        }
      }

    const addFav = () =>{
        dispatch(setId(contactData.id));
    }

    const deleteFav = () =>{
        dispatch(deleteId(contactData.id));
    }
  
// detail main page
  return (
    <View style={styles.container}>
        {contactData == false? (
            <ActivityIndicator size="large" />
        ) : (
            <View >
                <View style={{alignItems:'center', margin: 10}}>
                <Avatar  size={100} rounded source={{uri:contactData.imageAvailable == false?"https://uifaces.co/our-content/donated/KtCFjlD4.jpg":contactData.imageAvailable}}></Avatar>
                </View>
                 <Text style={styles.text}>Name: {contactData.firstName} {contactData.lastName}</Text>
                {contactData.jobTitle ? <Text style={styles.text}>Job: {contactData.jobTitle}</Text>:undefined}
                {contactData.birthday ? <Text style={styles.text}>Birthday: {contactData.birthday.month}/{contactData.birthday.day}/{contactData.birthday.year}</Text> : undefined}
                {getContactData(contactData.phoneNumbers, "number")}
                {getContactData(contactData.emails, "email")}
                <View style={{flexDirection:'row'}}>
                <TouchableOpacity style={styles.button} onPress={addFav}>
                    <Text style={styles.buttonText}>
                        Set Favourite
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.buttonDel} onPress={deleteFav}>
                    <Text style={styles.buttonText}>
                        Delete Favourite
                    </Text>
                </TouchableOpacity></View>
            </View>
        )}
    </View>);
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    marginTop: '20%',
    alignItems: 'center',
    alignSelf:'center',
    backgroundColor: 'white',
    padding: 10,
    elevation: 10,
    backgroundColor: '#e6e6e6',
    borderRadius: 10
  },
  button: {
    backgroundColor: '#82CAFF',
    alignItems: 'center',
    color: '#fff',
    height: 40,
    margin:10,
    width:'40%', 
    borderRadius:10

},
buttonDel: {
    backgroundColor: 'red',
    alignItems: 'center',
    color: '#fff',
    height: 40,
    margin:10,
    width:'45%', 
    borderRadius:10

},
buttonText:{
    margin :10,
    elevation: 10,
   
},
text: {
    fontSize: 18
},
image: {
    // alignSelf: 'center'
}
});

export default ContactDetails;

