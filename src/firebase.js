import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC2iO0kKD5NlA52rqjR4a_l26oEnnmprmg",
    authDomain: "tictok-clone-199f8.firebaseapp.com",
    databaseURL: "https://tictok-clone-199f8.firebaseio.com",
    projectId: "tictok-clone-199f8",
    storageBucket: "tictok-clone-199f8.appspot.com",
    messagingSenderId: "402225533241",
    appId: "1:402225533241:web:ac4f2f9a17a50ee820d8e8",
    measurementId: "G-KN3QP3K88K"
})

const db = firebaseApp.firestore()
const auth =firebase.auth()
const storage = firebase.storage()
const provider = new firebase.auth.GoogleAuthProvider()

export {db,auth,provider}
export default storage