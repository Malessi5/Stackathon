import firebase from 'firebase/app';
import 'firebase/auth';

const app = firebase.initializeApp({
  apiKey: 'AIzaSyCP1kFkQA7CTuzI1sbYFNFU8eGAMVnZ4q0',
  authDomain: 'stackathon-eb2e6.firebaseapp.com',
  databaseURL: 'https://stackathon-eb2e6-default-rtdb.firebaseio.com',
  projectId: 'stackathon-eb2e6',
  storageBucket: 'stackathon-eb2e6.appspot.com',
  messagingSenderId: '872333344695',
  appId: '1:872333344695:web:73fdea630fa9c3f7ef3232',
  measurementId: 'G-JXW4552NQ7',
});

export const auth = app.auth();
export default app;
