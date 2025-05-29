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

  const handleLogin = () => {
    if (localUsername.trim() !== '' && password !== '') {
      setUsername(localUsername);
      setIsLoggedIn(true);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
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
          <Text style={styles.header}>🌲 Welcome Back, Forest Guardian!</Text>
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
          <Button title="🌿 Start Growing" onPress={handleLogin} />
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
});