import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './components/HomeScreen';
import TaskScreen from './components/TaskScreen';
import SettingsScreen from './components/SettingsScreen';
import LoginScreen from './components/LoginScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Home">
            {() => <HomeScreen username={username} />}
          </Tab.Screen>
          <Tab.Screen name="Tasks" component={TaskScreen} />
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      ) : (
        <LoginScreen setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
      )}
    </NavigationContainer>
  );
}
