// TODO: Replace the following with your app's Firebase project configuration
let firebaseConfig = {
  apiKey: "AIzaSyC61QdeTI288q_6FYmrEE2UJIkbQ3YaMRg",
  authDomain: "project-db0c9.firebaseapp.com",
  projectId: "project-db0c9",
  storageBucket: "project-db0c9.appspot.com",
  messagingSenderId: "687553068893",
  appId: "1:687553068893:web:94c271ffad176b9704b2b4"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore();
  let auth = firebase.auth();

  const logoutUser = () => {
    auth.signOut();
    location.reload();
  }