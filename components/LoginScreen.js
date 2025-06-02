import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, KeyboardAvoidingView, Platform, ScrollView, Dimensions } from 'react-native';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const { height, width } = Dimensions.get('window');

export default function LoginScreen({ email, setEmail, password, setPassword, isLogin, setIsLogin }) {
 
  const auth = getAuth();

  const handleFireBaseAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
        console.log('Signed in');
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
    } catch (error) {
      console.error('Auth error:', error.message);
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
            {isLogin ? '🌱 Let’s Get Started!' : '🌲 Welcome Back, Forest Guardian!'}
          </Text>

          <TextInput
            style={style.input}
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <Button
            title={isLogin ? "🌿 Start Growing" : "🌿 Create Account"}
            onPress={handleFireBaseAuth}
          />

          <Text
            style={styles.toggleText}
            onPress={() => setIsLogin(prev => !prev)}
          >

            {isLogin ?  "New here? Create an account" : "Already have an account? Login here."}

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