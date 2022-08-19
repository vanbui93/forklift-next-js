import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { getDatabase } from 'firebase/database'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
    apiKey: 'AIzaSyC_wAS_hvMYt07HcWIeGETK3lNS-KJCd5I',
    authDomain: 'tanatforklift-2a513.firebaseapp.com',
    databaseURL: 'https://tanatforklift-2a513-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'tanatforklift-2a513',
    storageBucket: 'tanatforklift-2a513.appspot.com',
    messagingSenderId: '837375198367',
    appId: '1:837375198367:web:b602e6e738ca849c7a0eaa',
    measurementId: 'G-54T02PX46B',
}

export const firebaseAuth = firebase.initializeApp(firebaseConfig)

export const db = getDatabase(firebaseAuth)
export const storage = getStorage(firebaseAuth)

export const auth = firebaseAuth.auth()
