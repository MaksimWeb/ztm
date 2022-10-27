import { initializeApp } from 'firebase/app';
import {
  getAuth,
  signInWithRedirect,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';

import { getFirestore, doc, getDoc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyASe3JFpYBzBc4LcfVZV4L9k4q0uXbrR7g',
  authDomain: 'crwn-clothing-db-e0097.firebaseapp.com',
  projectId: 'crwn-clothing-db-e0097',
  storageBucket: 'crwn-clothing-db-e0097.appspot.com',
  messagingSenderId: '69941758424',
  appId: '1:69941758424:web:7c5fe9738698d939bbcaad',
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'users', userAuth.uid);

  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, { displayName, email, createdAt });
    } catch (e) {
      console.log('error creating user', e.message);
    }
  }

  return userDocRef;
};
