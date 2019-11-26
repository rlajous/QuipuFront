import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBh0EzznlqPRf4hdm7LrFntoiCqTLXf218',
  authDomain: 'quipu-8fca8.firebaseapp.com',
  databaseURL: 'https://quipu-8fca8.firebaseio.com',
  projectId: 'quipu-8fca8',
  storageBucket: 'quipu-8fca8.appspot.com',
  messagingSenderId: '282054120629',
  appId: '1:282054120629:web:38a2dd11cfc1b2314e5afc',
  measurementId: 'G-ST8HC36S8K'
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
