import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { View } from 'react-native';

import LoginScreen from './components/LoginScreen';

import { initializeApp } from 'firebase/app'; //for firebase initialization
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'; //for firebase authentication

//firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjVbudgaFIt_QkP6M2Ge2ZD-mxFcRIqJA",
  authDomain: "goon-foresters.firebaseapp.com",
  projectId: "goon-foresters",
  storageBucket: "goon-foresters.firebasestorage.app",
  messagingSenderId: "999224656014",
  appId: "1:999224656014:web:0aa7f09c2a50b66768c9df",
  measurementId: "G-FVBYTW30BB"
};

const app = initializeApp(firebaseConfig); //initialized firebase
const auth = getAuth(app) //auth instance

const Tab = createBottomTabNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  //effect runs once after component mounted because of empty dependency array []
  useEffect(() => {
    //setting up a listener that triggers the callback '(currentUser) => {setUser(currentUser)}'
    //everytime the user's auth state changes (login, logout, refresh)
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      //when state changes, this updates the app's user state with new Firebase currentUser object
      setUser(currentUser);
    });
    //this cleans up the lisetner when the component unmounts, preventing memory leaks or unexpected behaviour
    return () => unsubscribe();
  }, []);

  return (
    <NavigationContainer>
      {user ? (
        <Tab.Navigator>
          <Tab.Screen name="Forest Home" component={() => <View />} />
          <Tab.Screen name="Badges" component={() => <View />} />
          <Tab.Screen name="Tasks" component={() => <View />} />
          <Tab.Screen name="Settings" component={() => <View />} />
          <Tab.Screen name="Plant" component={() => <View />} />
        </Tab.Navigator>
      ) : (
        <LoginScreen
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
          isLogin={isLogin}
          setIsLogin={setIsLogin}
        />
      )}
    </NavigationContainer>
  );
}
