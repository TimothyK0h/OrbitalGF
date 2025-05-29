import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import LoginScreen from './components/LoginScreen';
import HomeTabs from './components/HomeTabs';
import TaskScreen from './components/TaskScreen';
import SettingsScreen from './components/SettingsScreen';
import PlantScreen from './components/PlantScreen';
import BadgesScreen from './components/BadgesScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [score, setScore] = useState(0);

  const initialTasks = [
    { id: '1', text: 'Recycle plastic bottles', points: 10, done: false },
    { id: '2', text: 'Use reusable shopping bag', points: 15, done: false },
    { id: '3', text: 'Take public transport', points: 20, done: false },
    { id: '4', text: 'Plant a tree', points: 50, done: false },
  ];

  const [tasks, setTasks] = useState(initialTasks);

  const completedTasks = tasks.filter(t => t.done).length;

  return (
    <NavigationContainer>
      {isLoggedIn ? (
        <Tab.Navigator>
          <Tab.Screen name="Forest Home">
            {() => <HomeTabs score={score} completedTasks={completedTasks} />}
          </Tab.Screen>

          <Tab.Screen name="Badges">
            {() => (
              <BadgesScreen
                progress={score}
                tasksCompleted={completedTasks}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Tasks">
            {() => (
              <TaskScreen
                tasks={tasks}
                setTasks={setTasks}
                onScoreChange={setScore}
              />
            )}
          </Tab.Screen>

          <Tab.Screen name="Settings" component={SettingsScreen} />

          <Tab.Screen name="Plant">
            {() => <PlantScreen progress={score} />}
          </Tab.Screen>
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
