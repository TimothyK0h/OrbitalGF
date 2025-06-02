// firebase.js
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, initializeAuth, getReactNativePersistence } from 'firebase/auth/react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

let app;
let auth;

export const getFirebaseAuth = () => {
  if (!getApps().length) {
    app = initializeApp({
      apiKey: "AIzaSyCjVbudgaFIt_QkP6M2Ge2ZD-mxFcRIqJA",
      authDomain: "goon-foresters.firebaseapp.com",
      projectId: "goon-foresters",
      storageBucket: "goon-foresters.firebasestorage.app",
      messagingSenderId: "999224656014",
      appId: "1:999224656014:web:0aa7f09c2a50b66768c9df",
      measurementId: "G-FVBYTW30BB"
    });

    auth = initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage),
    });
  } else {
    app = getApps()[0];
    auth = getAuth(app);
  }

  return auth;
};
