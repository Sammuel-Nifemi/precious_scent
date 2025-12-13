// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCCFs22sHT20bAtWrO7IIKsOQHa3c3qNgc",
  authDomain: "precious-scent-store.firebaseapp.com",
  projectId: "precious-scent-store",
  storageBucket: "precious-scent-store.firebasestorage.app",
  messagingSenderId: "1064325418100",
  appId: "1:1064325418100:web:ffd5254437706253e35521",
  measurementId: "G-7FGSC0QRGR"
};

// Init Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
