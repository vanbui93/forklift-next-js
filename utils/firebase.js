import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getStorage, ref, uploadBytes } from 'firebase/storage'
import { getDatabase } from 'firebase/database'

const firebaseConfig = {
    apiKey: 'AIzaSyBWCr5NIOAHS_Oqen0bMFa_EyU8U5_qqzQ',
    authDomain: 'tuantao-iphone.firebaseapp.com',
    databaseURL: 'https://tuantao-iphone-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'tuantao-iphone',
    storageBucket: 'tuantao-iphone.appspot.com',
    messagingSenderId: '41319189075',
    appId: '1:41319189075:web:d97ca251f0b89240f8d4a6',
    measurementId: 'G-HN6JTMD1GX',
}

export const firebaseAuth = firebase.initializeApp(firebaseConfig)

export const db = getDatabase(firebaseAuth)
export const storage = getStorage(firebaseAuth)

export const auth = firebaseAuth.auth()
