// Import the functions you need from the SDKs you need
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import app from '@react-native-firebase/app';
// import { getApp, getApps } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyCMBIoa0kNhJCSFC45bVw4uk0RPpQgUpJo",
//   authDomain: "goonforestor-firebase.firebaseapp.com",
//   projectId: "goonforestor-firebase",
//   storageBucket: "goonforestor-firebase.firebasestorage.app",
//   messagingSenderId: "546324666380",
//   appId: "1:546324666380:web:5c26f3e609933a8a0df629"
// };

//Prevent re-initialization
// const app = getApps().length === 0 ? (firebaseConfig) : getApp();

//initialize firestore
// const db = getFirestore(app);
const db = firestore();

export { db };
export default auth;

