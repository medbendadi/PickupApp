// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { GoogleAuthProvider, getAuth, GithubAuthProvider } from 'firebase/auth'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
   apiKey: "AIzaSyAL3nxTOoJxdvalgFnZ3XbiqOfDBK5Lj2U",
   authDomain: "uber-nextjs-app.firebaseapp.com",
   projectId: "uber-nextjs-app",
   storageBucket: "uber-nextjs-app.appspot.com",
   messagingSenderId: "457364286292",
   appId: "1:457364286292:web:5173ca160a52c8fb0eb6c1",
   measurementId: "G-99DSZMTV5T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const googleProvider = new GoogleAuthProvider()
const githubProvider = new GithubAuthProvider()
const auth = getAuth()

export { app, googleProvider, githubProvider, auth };