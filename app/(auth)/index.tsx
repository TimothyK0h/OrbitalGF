import auth, { FacebookAuthProvider, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithCredential } from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AccessToken, LoginManager } from 'react-native-fbsdk-next';

export default function Index() {

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<import('@react-native-firebase/auth').FirebaseAuthTypes.User | null>(null);

  // Handle user state changes
  function handleAuthStateChanged(user: import('@react-native-firebase/auth').FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = onAuthStateChanged(getAuth(), handleAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);
  
  useEffect(() =>{
      GoogleSignin.configure({
        webClientId: '546324666380-ikcoukp0rdcl78md8bir4ke99h1enjos.apps.googleusercontent.com',
      });
    }, []);

    async function onGoogleButtonPress() {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });

      // 🔄 Sign out to force account chooser next time
      await GoogleSignin.signOut();

      // Get the users ID token
      const signInResult = await GoogleSignin.signIn();

      // Try the new style of google-sign in result, from v13+ of that module
      const idToken = signInResult.data?.idToken;
      if (!idToken) {
        throw new Error('No ID token found');
      }

      // Create a Google credential with the token
      if (!signInResult.data) {
        throw new Error('Google sign-in result data is null');
      }
      const googleCredential = GoogleAuthProvider.credential(signInResult.data.idToken);
      console.log(idToken, googleCredential);

      // Sign-in the user with the credential
      return signInWithCredential(getAuth(), googleCredential);
    }

    async function onFacebookButtonPress() {
      // Attempt login with permissions
      const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw 'User cancelled the login process';
      }

      // Once signed in, get the users AccessToken
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw 'Something went wrong obtaining access token';
      }

      // Create a Firebase credential with the AccessToken
      const facebookCredential = FacebookAuthProvider.credential(data.accessToken);

      // Sign-in the user with the credential
      return signInWithCredential(getAuth(), facebookCredential);
    }

  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);
    try {
      await auth().signInWithEmailAndPassword(email, password);
      Alert.alert('Login Successful');
      router.navigate('/(auth)/(nav)/home')
    } catch (e: any) {
      Alert.alert('Login Failed', e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ImageBackground source={require('../../assets/images/intro-bg.jpg')} style={styles.bg} resizeMode={'cover'}>
        <View style={{ flex: 1 }}>
        <View style={styles.header}>
            <Text style={styles.logo}>GF</Text>
        </View>
      <KeyboardAvoidingView
  style={{ flex: 1 }}
  behavior={Platform.OS === 'ios' ? 'padding' : undefined}
>
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <View style={styles.container}>
          <Text style={styles.title}>Login</Text>

          <Text style={styles.label}>User Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Email / Phone Number"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            placeholderTextColor="#aaa"
          />

          <View style={styles.passwordRow}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity>
              <Text style={styles.forgot}>Forgot Password?</Text>
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.input}
            placeholder="Enter Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            placeholderTextColor="#aaa"
          />

          {loading ? (
            <ActivityIndicator size="small" style={{ marginVertical: 20 }} />
          ) : (
            <>
              <TouchableOpacity style={styles.loginButton} onPress={signIn}>
                <Text style={styles.loginButtonText}>LOGIN NOW</Text>
              </TouchableOpacity>
            </>
          )}

          <View style={styles.orLine}>
            <View style={styles.line} />
            <Text style={styles.or}>Or login using</Text>
            <View style={styles.line} />
          </View>

          <View style={styles.socialRow}>
            <TouchableOpacity
              style={styles.socialBtn}
              onPress={async () => {
                try {
                  await onFacebookButtonPress();
                  Alert.alert('Signed in with Facebook!');
                  router.navigate('/(auth)/(nav)/home');    
                } catch (e: any) {
                  Alert.alert('Facebook Sign-In failed:', e.message);
                }
              }}>
              <Image source={require('../../assets/images/facebook-logo.png')} style={styles.socialIcon} />
              <Text style={styles.socialTextFacebook}>Facebook</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.socialBtn}
              onPress={async () => {
                try {
                  await onGoogleButtonPress();
                  Alert.alert('Signed in with Google!');
                  router.navigate('/(auth)/(nav)/home');
                } catch (e: any) {
                  Alert.alert('Google Sign-In failed:', e.message);
                }
              }}
            >
              <Image source={require('../../assets/images/gmail-logo.png')} style={styles.socialIcon} />
              <Text style={styles.socialTextGmail}>Gmail</Text>
            </TouchableOpacity>
          </View>

            <Text style={styles.bottomText}>
              Don’t have an account yet?
            </Text>

          <TouchableOpacity onPress={() => router.push('/signup')}>
            <Text style={styles.link}>Create New Account</Text>
          </TouchableOpacity>
          

        </View>
  </ScrollView>
</KeyboardAvoidingView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
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
  bg: {
    flex: 1,
    justifyContent: 'center',
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
  scroll: {
    paddingVertical: 40,
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
  passwordRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  forgot: {
    fontSize: 15,
    color: '#1db954',
    textDecorationLine: 'underline'
  },
  loginButton: {
    backgroundColor: '#2bbf5e',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    marginHorizontal: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  signUpButton: {
    alignItems: 'center',
    marginBottom: 20,
  },
  signUpButtonText: {
    color: '#2bbf5e',
    fontWeight: 'bold',
  },
  orLine: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
    fontSize: 20,
    fontWeight: '500',
    color: 'red',
  },
  socialTextFacebook: {
    fontSize: 20,
    fontWeight: '500',
    color: 'blue'
  },
  bottomText: {
    textAlign: 'center',
    fontSize: 15,
    color: '#222',
    justifyContent: 'center'
  },
  link: {
    color: '#2bbf5e',
    fontSize: 25,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 80,
    
  },
});
