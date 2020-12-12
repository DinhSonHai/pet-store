import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

//Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyCu1jT5CCXx9qTgvgvLUJ5YXT_v_VTjUHg',
  authDomain: 'pet-store-ed9d7.firebaseapp.com',
  databaseURL: 'https://pet-store-ed9d7.firebaseio.com',
  projectId: 'pet-store-ed9d7',
  storageBucket: 'pet-store-ed9d7.appspot.com',
  messagingSenderId: '666638741354',
  appId: '1:666638741354:web:ea89298e0a4c5fb213bf13',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

export { projectStorage, projectFirestore, timestamp };
