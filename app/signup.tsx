import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ImageBackground,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import { useEffect } from 'react'

export default function SignUp() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [place, setPlace] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const signUp = async () => {
        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

      setLoading(true);
      try {
        await auth().createUserWithEmailAndPassword(email, password);
        alert('Check your email to verify your account!');
        router.navigate('/(auth)/home')
      } catch (e: any) {
        alert('Registration Failed: ' + e.message);
      } finally {
        setLoading(false);
      }
    };

  return (
    <ImageBackground source={require('../assets/images/intro-bg.jpg')} style={styles.bg} resizeMode="cover">
      <View style={{ flex: 1 }}>
        <View style={styles.header}>
          <Text style={styles.logo}>GF</Text>
        </View>

        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined} style={{ flex: 1 }}>
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={styles.container}>
              <Text style={styles.title}>Create New Account</Text>

              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                placeholder="E.g: Timothy koh"
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>Place</Text>
              <TextInput
                style={styles.input}
                placeholder="Select"
                value={place}
                onChangeText={setPlace}
              />

              <Text style={styles.label}>Email Address</Text>
              <TextInput
                style={styles.input}
                placeholder="user@mail.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <Text style={styles.label}>Phone Number</Text>
              <TextInput
                style={styles.input}
                placeholder="+91 99887 76655"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Text style={styles.label}>Confirm Password</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              <TouchableOpacity style={styles.signupButton} onPress={signUp}>
                <Text style={styles.signupButtonText}>CREATE ACCOUNT NOW</Text>
              </TouchableOpacity>

              <View style={styles.orLine}>
                <View style={styles.line} />
                <Text style={styles.or}>Or Signup using</Text>
                <View style={styles.line} />
              </View>

              <View style={styles.socialRow}>
                <TouchableOpacity style={styles.socialBtn}>
                  <Image source={require('../assets/images/facebook-logo.png')} style={styles.socialIcon} />
                  <Text style={styles.socialTextFacebook}>Facebook</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.socialBtn}>
                  <Image source={require('../assets/images/gmail-logo.png')} style={styles.socialIcon} />
                  <Text style={styles.socialTextGmail}>Gmail</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.bottomText}>
                  Already have an account? <Text style={styles.loginNow}>Login Now</Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'center',
  },
  header: {
    position: 'absolute',
    top: 30,
    left: 20,
  },
  logo: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 'bold',
  },
  container: {
    flexGrow: 1,
    padding: 20,
    marginTop: 70,
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    marginLeft: 10,
  },
  label: {
    fontSize: 16,
    marginLeft: 10,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 14,
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  signupButton: {
    backgroundColor: '#2bbf5e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  signupButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  orLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  or: {
    marginHorizontal: 10,
    color: '#444',
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  socialRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 25,
    marginHorizontal: 10,
  },
  socialBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 6,
    flex: 1,
    justifyContent: 'center',
    marginHorizontal: 5,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  socialIcon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  socialTextGmail: {
    fontSize: 16,
    fontWeight: '500',
    color: 'red',
  },
  socialTextFacebook: {
    fontSize: 16,
    fontWeight: '500',
    color: 'blue',
  },
  bottomText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#222',
    marginBottom: 30,
  },
  loginNow: {
    color: '#2bbf5e',
    textDecorationLine: 'underline',
    fontWeight: 'bold',
  },
});

function setLoading(arg0: boolean) {
    throw new Error('Function not implemented.');
}


