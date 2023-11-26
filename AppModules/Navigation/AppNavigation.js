import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer, NavigationContext} from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import LoginScreen from '../Screens/LoginScreen';
import UploadImage from "../Screens/UploadImage";
const Stack = createNativeStackNavigator();
const AppNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{headerShown: false}}
        initialRouteName={'Login'}>
        <Stack.Screen name={'Home'} component={HomeScreen} />
        <Stack.Screen name={'Login'} component={LoginScreen} />
        <Stack.Screen name={'Upload'} component={UploadImage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AppNavigation;
