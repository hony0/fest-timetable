import firebase from 'firebase'
import 'firebase/firestore'
import config from './../util/firebaseConfig'

const firebaseApp = firebase.initializeApp(config)
const firestore = firebaseApp.firestore()

export default (!firebase.apps.length ? firebase.app() : firestore)