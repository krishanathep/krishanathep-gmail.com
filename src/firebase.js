import * as firebase from 'firebase'

const config = {
    apiKey: "AIzaSyABHyyHWCMV1OZx40hJZ9oor3W4jLRSJ34",
    authDomain: "v-fire-bbd63.firebaseapp.com",
    databaseURL: "https://v-fire-bbd63.firebaseio.com",
    projectId: "v-fire-bbd63",
    storageBucket: "v-fire-bbd63.appspot.com",
    messagingSenderId: "674916818379",
    appId: "1:674916818379:web:969de3cd17160cbd8faa4e"
}
firebase.initializeApp(config)

export default firebase