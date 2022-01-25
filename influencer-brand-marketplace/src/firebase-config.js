import firebase from "firebase/compat/app";
import "firebase/firestore";
import "firebase/auth";
import { getAuth } from "firebase/auth";
import "firebase/firestore";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPp5UxyPrsZbPHciX9qrnjz2E0zA6ptMU",
  authDomain: "influencer-brand-jobplace.firebaseapp.com",
  projectId: "influencer-brand-jobplace",
  storageBucket: "influencer-brand-jobplace.appspot.com",
  messagingSenderId: "116321124852",
  appId: "1:116321124852:web:ccda5f7f7bbb63c6a439a1",
  measurementId: "G-C7XQX6M6XF",
};

const app = firebase.initializeApp(firebaseConfig);

//export const auth = getAuth(app);
const auth = getAuth(app);
export { auth };
const db = getFirestore();
export { db };
