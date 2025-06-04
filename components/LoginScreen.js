import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { login, signup } from '../api';
import { Alert } from 'react-native'

const { height, width } = Dimensions.get('window');

export default function LoginScreen({ setIsLoggedIn, setUsername }) {

  const [localUsername, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleLogin = async () => {
  if (!localUsername || !password) {
    Alert.alert("Missing Fields", "Username and password are required.");
    return;
  }

  try {

    if (isNewUser) {
      // Attempt signup
      const res = await signup({ username: localUsername, password });

      Alert.alert("Success", "Account created successfully! Please log in.");
      setIsNewUser(false);
      return;
    }

    // Attempt login
    const res = await login({ username: localUsername, password });
    const token = res.data.token;

    await AsyncStorage.setItem('token', token);
    setUsername(localUsername);
    setIsLoggedIn(true);

    Alert.alert("Welcome", `Logged in as ${localUsername}`);

  } catch (err) {
    const status = err.response?.status;
    const message = err.response?.data?.error;

    if (isNewUser) {
      // Handle signup errors
      if (status === 400 && message === 'Username already exists.') {
        Alert.alert("Signup Failed", "That username is already taken. Try another.");
      } else {
        Alert.alert("Signup Error", message || "Could not create account.");
      } 
    } else {
      // Handle login errors
      if (status === 401 && message === 'User not found.') {
        Alert.alert("Login Failed", "No account found with that username.");
      } else if (status === 401 && message === 'Incorrect password.') {
        Alert.alert("Login Failed", "Incorrect password. Please try again.");
      } else {
        Alert.alert("Login Error", message || "Something went wrong.");
      }
    }
  }
};

  return (
    <KeyboardAvoidingView
      //shifts view box so that it will not be blocked by keyboard when keying in texts
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >

      <ScrollView
      //allows scrolling for texts that are too long up and down
      contentContainerStyle={styles.scrollContainer}>

        <Image
          source={require('../assets/forest-gif.gif')}
          style={styles.fullGif}
          resizeMode="cover"
        />
        <Image
          source={require('../assets/goon-foresters-icon.png')}
          style={styles.logo}
        />
        <View style={styles.container}>
          <Text style={styles.header}>
            {isNewUser ? '🌱 Let’s Get Started!' : '🌲 Welcome Back, Forest Guardian!'}
          </Text>

          {isNewUser && (
            //extra info for new user to key in when isNewUser activates true
            <>
              <TextInput
                style={styles.input}
                placeholder="Name"
                value={name}
                onChangeText={setName}
              />
              <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                value={email}
                onChangeText={setEmail}
              />
              <TextInput
                style={styles.input}
                placeholder="Age"
                keyboardType="numeric"
                value={age}
                onChangeText={setAge}
              />
            </>
          )}

          <TextInput
            style={styles.input}
            placeholder="Username"
            value={localUsername}
            onChangeText={setLocalUsername}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Button
            title={isNewUser ? "🌿 Create Account" : "🌿 Start Growing"}
            onPress={handleLogin}
          />

          <Text
            style={styles.toggleText}
            onPress={() => setIsNewUser(prev => !prev)}
          >
            {isNewUser ? "Already have an account? Login here." : "New here? Create an account"}
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eaf8ec',
  },
  fullGif: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
    zIndex: -1,
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 60,
    marginBottom: 20,
    borderRadius: 20,
  },
  container: {
    width: '90%',
    backgroundColor: 'rgba(200, 255, 200, 0.8)',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2e7d32',
  },
  input: {
    borderWidth: 1,
    borderColor: '#a5d6a7',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: '#ffffffee',
    width: '100%',
  },
  toggleText: {
    color: '#2e7d32',
    marginVertical: 12,
    textDecorationLine: 'underline',
    textAlign: 'center',
    fontSize: 14,
  },
});