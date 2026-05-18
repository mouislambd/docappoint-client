import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyA8s7mqiZw2PlyELED910qmtX3Rh8SgdLg",
    authDomain: "docappoint-8494a.firebaseapp.com",
    projectId: "docappoint-8494a",
    storageBucket: "docappoint-8494a.firebasestorage.app",
    messagingSenderId: "962923571866",
    appId: "1:962923571866:web:5dd55c4be2d33a4c24cd23"
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export const signInWithGoogle = () => signInWithPopup(auth, googleProvider)
export const signOutUser = () => signOut(auth)