// Import the functions you need from the SDKs you need
//                         use final progect firebase 
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBRFCVQXzJGW-w4nB4W2bcqCJdaugOoqIM",
  authDomain: "final-project-95229.firebaseapp.com",
  projectId: "final-project-95229",
  storageBucket: "final-project-95229.appspot.com",
  messagingSenderId: "156023513350",
  appId: "1:156023513350:web:173f03a95d6d06c4b0fe87"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app