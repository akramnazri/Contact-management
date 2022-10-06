import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import * as Contacts from 'expo-contacts';
import { Button, StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView, FlatList } from 'react-native';
import { Avatar, Icon, ListItem, SearchBar } from 'react-native-elements';
import { useSelector, useDispatch } from 'react-redux';
import { deleteId, setId} from '../redux/actions';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen =({navigation})=> {
    const { id } = useSelector(state=>state.userReducer);
    let [error, setError] = useState(undefined);
    let [contacts, setContactData] = useState(undefined);
    const [SearchData, setSearchData] = useState('');
    const dispatch = useDispatch();

    useEffect(()=>{
        getLocalItem();
        (async () => {
            const { status } = await Contacts.requestPermissionsAsync();
            if( status === 'granted') {
                const {data} = await Contacts.getContactsAsync({
                    fields: [ Contacts.Fields.Birthday, Contacts.Fields.Emails, Contacts.Fields.FirstName, Contacts.Fields.LastName, Contacts.Fields.PhoneNumbers, Contacts.Fields.Image]
                });

                if( data.length > 0){
                    setContactData(data);
                } else {
                    setError("no data");
                }
            }else{
                setError('Permission Denied');
            }
        })();
    },[]);

    const getLocalItem = async () => {
        // get Data from Storage
    try {
        const data = await AsyncStorage.getItem('@contactid');
        if (data !== null) {
            
            let arr = JSON.parse(data); 
            arr.map((v,i)=>
                dispatch(setId(v))
            ); 
            console.log(arr)
        }
      } catch (error) {
        console.log(error);
      }
     
    }


      const getlistdatafav = () => {
        // console.log(item)
        return contacts.map((item, index) => {
            if(id.includes(item.id) &&  item.name.toLowerCase().includes(SearchData.toLowerCase())){
            return ( 
            <View style={styles.contact}>
                <ListItem
                    key = {item.id}
                    onPress={() =>
                            navigation.navigate('View Contact',{
                            contactData: item})}
                    containerStyle={{
                        marginHorizontal: 16,
                        marginVertical: 8,
                        borderRadius: 8,
                    }}
                    bottomDivider
                >
                    <Avatar rounded source={{uri:item.imageAvailable == false?"https://uifaces.co/our-content/donated/KtCFjlD4.jpg":item.imageAvailable}}></Avatar>
                    <ListItem.Content>
                        <ListItem.Title>
                            {item.name}
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            {item.jobTitle}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <Icon
                        name="star"
                        type='font-awesome'
                        color={id.includes(item.id)?'yellow':'grey'}
                        
                    ></Icon>
                </ListItem>
              </View>
            )}else{
                return undefined;
            }
        })
      }

      const getlistdata = () => {
        // console.log(item)
        return contacts.map((item, index) => {
            if(!id.includes(item.id) && item.name.toLowerCase().includes(SearchData.toLowerCase())){
            return ( 
            <View style={styles.contact}>
                <ListItem
                    key = {item.id}
                    onPress={() =>
                            navigation.navigate('View Contact',{
                            contactData: item})}
                    containerStyle={{
                        marginHorizontal: 16,
                        marginVertical: 8,
                        borderRadius: 8,
                    }}
                    bottomDivider
                >
                    <Avatar rounded source={{uri:item.imageAvailable == false?"https://uifaces.co/our-content/donated/KtCFjlD4.jpg":item.imageAvailable}}></Avatar>
                    <ListItem.Content>
                        <ListItem.Title>
                            {item.name}
                        </ListItem.Title>
                        <ListItem.Subtitle>
                            {item.jobTitle}
                        </ListItem.Subtitle>
                    </ListItem.Content>
                    <Icon
                        name="star"
                        type='font-awesome'
                        color={id.includes(item.id)?'yellow':'grey'}
                        
                    ></Icon>
                </ListItem>
              </View>
            )}else{
                return undefined;
            }
        })
      }

      const onChangeSearch = (search) => {
        setSearchData(search);
      }
    
      return (
        <SafeAreaView style={styles.container}>
            <SearchBar
                placeholder="Search"
                lightTheme
                round
                onChangeText={onChangeSearch}
                value={SearchData}
                />
          {contacts !== undefined?
           
            <ScrollView>
                {getlistdatafav()}
                {getlistdata()}
            </ScrollView>
            :
            <Text>Awaiting contacts...</Text>}
          <Text>{error}</Text>
          <StatusBar style="auto" />
        </SafeAreaView>
      );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  button: {
    backgroundColor: 'red',
    alignItems: 'center',
    color: '#fff',
    height: 40,
    margin:5,
    marginHorizontal:10,   
    width:'40%', 
    borderRadius:10

},
contact: {
    margin: 0,
    width: '100%'
  },
buttonText:{
    margin :10,
    elevation: 10,
   
},
});

export default HomeScreen;

