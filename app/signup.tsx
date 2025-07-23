import auth from '@react-native-firebase/auth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

export default function SignUp() {
  const router = useRouter();

    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [place, setPlace] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [openPlace, setOpenPlace] = useState(false);
    const [placeItems, setPlaceItems] = useState([
      { label: 'Singapore', value: 'Singapore' },
      { label: 'Malaysia', value: 'Malaysia' },
      { label: 'Vietnam', value: 'Vietnam' },
      { label: 'United States', value: 'USA' },
      { label: 'United Kingdom', value: 'UK' },
      { label: 'Japan', value: 'Japan' },
    ]);
    const [openPhone, setOpenPhone] = useState(false);
    const [phoneCode, setPhoneCode] = useState('');
    const [phoneItems, setPhoneItems] = useState([
      { label: '+65', value: '+65' },
      { label: '+60', value: '+60' },
      { label: '+84', value: '+84' },
      { label: '+1', value: '+1' },
      { label: '+44', value: '+44' },
      { label: '+81', value: '+81' },
    ]);

  const signUp = async () => {
        if (!name || !place || !email || !password || !phone || !confirmPassword) {
            alert('Please enter all required fields.');
            return;
        }

      setLoading(true);
      try {
        await auth().createUserWithEmailAndPassword(email, password);
        alert('Check your email to verify your account!');
        router.navigate('/(auth)/(nav)/home')
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

              <Text style={styles.label}>Name
                <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="E.g: Timothy koh"
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>Place
                <Text style={styles.required}>*</Text>
              </Text>
              <View style={{ zIndex: 3000, marginHorizontal: 10, marginBottom: 15 }}>
                <View style={{ height: openPlace ? 200 : 50 }}>
                  <DropDownPicker
                    open={openPlace}
                    value={place}
                    items={placeItems}
                    setOpen={setOpenPlace}
                    setValue={setPlace}
                    setItems={setPlaceItems}
                    searchable={true}
                    placeholder="Select country"
                    zIndex={3000}
                    listMode="MODAL"
                  />
                </View>
              </View>
              <Text style={styles.label}>Email Address
                <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="user@mail.com"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
              />

              <Text style={styles.label}>Phone Number
                <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.phoneRow}>
                <View style={styles.phoneCodeWrapper}>
                  <DropDownPicker
                    open={openPhone}
                    value={phoneCode}
                    items={phoneItems}
                    setOpen={setOpenPhone}
                    setValue={setPhoneCode}
                    setItems={setPhoneItems}
                    searchable={true}
                    placeholder="+65"
                    listMode="MODAL"
                    closeAfterSelecting={true}
                  />

              </View>
              <TextInput
                style={styles.phoneInput}
                placeholder="Phone Number"
                value={phone}
                onChangeText={setPhone}
                keyboardType="phone-pad"
              />
              </View>

              <Text style={styles.label}>Password
                <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <Text style={styles.label}>Confirm Password
                <Text style={styles.required}>*</Text>
              </Text>
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

              <TouchableOpacity onPress={() => router.back()}>
                <Text style={styles.bottomText}>
                  Already have an account? <Text style={styles.loginNow}>Login Now</Text>
                </Text>
              </TouchableOpacity>

              <Text style={styles.mandatoryNote}>
                <Text style={styles.required}>*</Text> Mandatory fields
              </Text>
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
  required: {
  color: 'red',
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
  mandatoryNote: {
    textAlign: 'left',
    color: '#777',
    fontSize: 12,
    marginLeft: 15,
    marginBottom: 10,
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
  phoneRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: 15,
  marginHorizontal: 10,
},
phoneCodeWrapper: {
  width: '30%',
  zIndex: 2000,
},
phoneInput: {
  width: '65%',
  backgroundColor: '#fff',
  borderRadius: 8,
  borderWidth: 1,
  borderColor: '#ccc',
  paddingHorizontal: 15,
  paddingVertical: 12,
  fontSize: 14,
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