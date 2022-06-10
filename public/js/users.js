const { getAuth } = require('firebase-admin/auth');

let ui = new firebaseui.auth.AuthUI(auth);

auth.onAuthStateChanged((user) => {

    if ((user) && (auth.currentUser.email.split('@')[0] == "stelios.toump")) {
        getUsers();

    } else {
        location.replace("/");
    }
})


//fetch users written blogs for admin
const getUsers = () => {
    
    listAllUsers();
    /* var user = firebase.auth().currentUser;

    user.delete().then(function() {
      // User deleted.
    }).catch(function(error) {
      // An error happened.
    }); */

}

const listAllUsers = (nextPageToken) => {
    // List batch of users, 1000 at a time.
    getAuth()
    .getUserByEmail(email)
    .then((userRecord) => {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
    })
    .catch((error) => {
        console.log('Error fetching user data:', error);
    });
};
  

const deleteBlog = (id) => {
    db.collection("blogs").doc(id).delete().then(() => {
        location.reload();
    })
    .catch((error) => {
        console.log("Error deleting the blog");
    })
} 