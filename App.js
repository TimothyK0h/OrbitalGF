import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import LoginScreen from './components/LoginScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Forest Home" component={() => <View />} />
          <Tab.Screen name="Badges" component={() => <View />} />
          <Tab.Screen name="Tasks" component={() => <View />} />
          <Tab.Screen name="Settings" component={() => <View />} />
          <Tab.Screen name="Plant" component={() => <View />} />
        </Tab.Navigator>
      ) : (
        <LoginScreen
          setIsLoggedIn={setIsLoggedIn}
          setUsername={setUsername}
        />
      )}
    </NavigationContainer>
  );
}