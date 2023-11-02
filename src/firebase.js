import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD2QSNW0L4aIGwy7Bb3HLp8MPvNvp1N8Eg",
    authDomain: "hirepro-sp.firebaseapp.com",
    projectId: "hirepro-sp",
    storageBucket: "hirepro-sp.appspot.com",
    messagingSenderId: "185986606023",
    appId: "1:185986606023:web:4551a9525806020eb6afe2",
    measurementId: "G-5D5KEK13Q5"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the storage service
const storage = getStorage(firebaseApp);

export { storage, firebaseApp as default };