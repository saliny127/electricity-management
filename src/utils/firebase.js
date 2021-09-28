import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"

//firebase config
const app = firebase.initializeApp({
  apiKey: "AIzaSyB174ncs-bvgWgRIxWJAJ7fZiXG0oNJ9sQ",
  authDomain: "social-chat-bot-assistant.firebaseapp.com",
  databaseURL: "https://social-chat-bot-assistant-default-rtdb.firebaseio.com",
  projectId: "social-chat-bot-assistant",
  storageBucket: "social-chat-bot-assistant.appspot.com",
  messagingSenderId: "38627751527",
  appId: "1:38627751527:web:793d2ee15450e44243c6c2",
  measurementId: "G-ET49FWJJT5"
})

export const auth = app.auth()

//db
const db = firebase.firestore();
export const firebaseTimestamp = firebase.firestore.FieldValue.serverTimestamp;
//backoffice
export const backOfficeCollection = db.collection('BackOffice');
//public transport
export const lostDetailsCollection = db.collection('transportLost');
export const transportComplaintsCollection = db.collection('transportComplaint');
export const e_provinces = db.collection('e_proviences');
export const e_areaOffices = db.collection('e_areaOffices');
export const e_areas = db.collection('e_areas');
export const e_schedules = db.collection('e_schedules');
export const e_users = db.collection('e_users');
export const e_complains = db.collection('e_complains');

export default firebase;

export { app, db };
