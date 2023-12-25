// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTu6TuWEVmKDsVPiiD5aYSTcv5VSipFdE",
  authDomain: "task-management-24435.firebaseapp.com",
  projectId: "task-management-24435",
  storageBucket: "task-management-24435.appspot.com",
  messagingSenderId: "633635314063",
  appId: "1:633635314063:web:6f1f13846a7529fd1cd3fa"
};;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 const auth = getAuth(app);
 export default auth