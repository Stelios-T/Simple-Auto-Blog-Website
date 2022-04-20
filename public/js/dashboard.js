let ui = new firebaseui.auth.AuthUI(auth);
let login = document.querySelector('.login');

auth.onAuthStateChanged((useer) => {
    if(user) {
        login.style.display = "none";
    } else {
        setupLoginButton();
    }
})

const setupLoginButton = () => {
    ui.start("#loginUI", {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectURL) {
                login.style.display = "none";
                return false;
            }    
        }, 
        signInFlow: "popup",
        signInOptions: [firebase.auth.GoogleAuthProvider.PROVIDER_ID]
    })

}