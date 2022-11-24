
// TODO: Replace the following with your app's Firebase project configuration
let firebaseConfig = {
  //...
};

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  let db = firebase.firestore();
  let auth = firebase.auth();

  const logoutUser = () => {
    auth.signOut();
    location.reload();
  }
