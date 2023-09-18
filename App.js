/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { Alert,} from 'react-native';
import { NavigationContainer, } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';
import Onboarding from './screens/Onboarding';
import SplashScreen from './screens/Splashscreen';
import DrawerNavigator from './drawers/DrawerNavigator';

const App = () => {
  const [loading, setLoading] = useState(true)
  const [status, setStatus] = useState(false)
  const Stack = createNativeStackNavigator();
  
  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem('email');
        if (value === null) {
          setStatus(false)
        }
        else{
          setStatus(true)
        }
      } catch (e) {
        Alert.alert("Error",e.message)
      }
      setLoading(false)
    })();
  });

  if (loading) {
    return <SplashScreen />;
  }
  else if(!loading){
    console.log(status)
  return (
    <NavigationContainer>
        <Stack.Navigator initialRouteName={status?'SignedIn':'Onboarding'} screenOptions={{headerShown:false}}>
              <Stack.Screen name="Drawer" component={DrawerNavigator} options={{ headerTitleAlign: "center", headerTitle: (props) => <LogoTitle {...props} /> }} />
              <Stack.Screen name="Onboarding" component={Onboarding} options={{ headerTitleAlign: "center", headerTitle: (props) => <LogoTitle {...props} /> }} />
        </Stack.Navigator>
    </NavigationContainer>

  );
}
}

export default App;
