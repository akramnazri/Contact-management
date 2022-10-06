import * as React from 'react';
import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import { Store } from './src/redux/store';
import HomeScreen from './src/screens/HomeScreen';
import ContactDetails from './src/screens/ContactDetails';

export default function App() {
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ title: 'Contact' }}
            />
            <Stack.Screen
              name="View Contact"
              component={ContactDetails}
              options={{ title: 'Contact Details' }}
            />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
