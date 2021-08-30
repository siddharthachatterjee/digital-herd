// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6fO2ZoT4eJTH0feQQ3EXJmwQb8RMcV3U",
  authDomain: "jungletokens.firebaseapp.com",
  projectId: "jungletokens",
  storageBucket: "jungletokens.appspot.com",
  messagingSenderId: "518952436112",
  appId: "1:518952436112:web:949fbab23162f38a7fb315",
  measurementId: "G-Z0M1YYCX3Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;