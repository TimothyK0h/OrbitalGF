import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './components/LoginScreen';
import HomeTabs from './components/HomeTabs'; // Swipeable tabs (forest)
import TaskScreen from './components/TaskScreen';
import SettingsScreen from './components/SettingsScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);


  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Forest Home">
            {() => <HomeTabs score={score} />}
          </Tab.Screen>
          <Tab.Screen name="Tasks">
            {() => <TaskScreen onScoreChange={setScore} />}
          </Tab.Screen>
          <Tab.Screen name="Settings" component={SettingsScreen} />
        </Tab.Navigator>
      ) : (
        <LoginScreen setIsLoggedIn={setIsLoggedIn} setUsername={setUsername} />
      )}
    </NavigationContainer>
  );
}
