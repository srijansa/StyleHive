import { initializeApp } from 'firebase/app';
import { getRedirectResult } from 'firebase/auth';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCac-QhiHMszb_WO3SGptSjV0BenP17Xcs",
    authDomain: "style-hive-db.firebaseapp.com",
    projectId: "style-hive-db",
    storageBucket: "style-hive-db.firebasestorage.app",
    messagingSenderId: "151132085479",
    appId: "1:151132085479:web:fb64c9c84026ec08b69642"
  };
  
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithGoogleRedirect(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;
    return await createUserWithEmailAndPassword(auth, email, password);
}