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

const { height, width } = Dimensions.get('window');

export default function LoginScreen({ setIsLoggedIn, setUsername }) {

  const [localUsername, setLocalUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');

  const handleLogin = () => {

    if (localUsername.trim() !== '' && password !== '') {

      if (isNewUser) {
        console.log("Creating new user:");
        console.log("Username:", localUsername);
        console.log("Password:", password);
        console.log("Email:", email);
        console.log("Name:", name);
        console.log("Age:", age);
        // TODO: Save to AsyncStorage or backend later (Firebase)
      } else {
        console.log("Logging in existing user:", localUsername);
        // TODO: Validate login credentials
      }

      setUsername(localUsername);
      //when setIsLoggedIn set to true, it updates state in App.js, triggering a re-render that switches
      //the view from LoginScreen to bottom tab navigator (Forest Home, Tasks, etc.)
      setIsLoggedIn(true);
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