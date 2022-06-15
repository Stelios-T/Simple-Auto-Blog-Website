

let ui = new firebaseui.auth.AuthUI(auth);
let login = document.querySelector('.login');
const blogSection = document.querySelector('.blogs-section');

auth.onAuthStateChanged((user) => {

    if ((user) && (auth.currentUser.email.split('@')[0] == "stelios.toump")) {
        login.style.display = "none";
        getAdminBlogs();

    } else if(user) {
        
        login.style.display = "none";
        getUserWrittenBlogs();

    }  else {
        login.innerHTML += `
        <a href="/">
            <img src="img/logo.png" class="logo" style="position: absolute; top: 3%; left: 2%; width: 8.5%; height: 5%;" alt="">
        </a>
        <h5 class="text" style="color: rgba(0, 0, 0, 0.4); position: fixed; bottom: 10%;">*select SIGN IN if you don't have an account to create a new one</h5>
        `
        setupLoginButton();
    }
})

const setupLoginButton = () => {
    ui.start("#loginUI", {
        callbacks: {
            signInSuccessWithAuthResult: function(authResult, redirectURL) {
                login.style.display = "none";
                location.reload();
                return false;
            }    
        }, 
        signInFlow: "popup",
        signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID, firebase.auth.GoogleAuthProvider.PROVIDER_ID  ]
        
    })

}

//fetch user written blogs
const getUserWrittenBlogs = () => {

    db.collection("blogs").where("author", "==", auth.currentUser.email.split('@')
    [0])
    .get()
    .then((blogs) => {
        blogs.forEach((blog) => {
            createBlog(blog);
        })
    })
    .catch((error) => {
        console.log("Error getting blogs");
    })

}

//fetch users written blogs for admin
const getAdminBlogs = () => {

    db.collection("blogs")
    .get()
    .then((blogs) => {
        blogs.forEach((blog) => {
            createBlog(blog);
        })
    })
    .catch((error) => {
        console.log("Error getting blogs");
    })

}

const createBlog = (blog) => {
    let data = blog.data();
    blogSection.innerHTML += `
    <div class="blog-card">
        <img src="${data.bannerImage}" class="blog-image" alt="">
        <h1 class="blog-title">${data.title.substring(0, 100) + '...'}</h1>
        <p class="blog-overview">${data.article.substring(0, 200) + '...'}</p>
        <a href="/${blog.id}" class="btn dark">read</a>
        <a href="/${blog.id}/editor" class="btn grey">edit</a>
        <a href="#" onClick="deleteBlog('${blog.id}')" class="btn danger">delete</a>
    </div>
    `;
}

const deleteBlog = (id) => {
    db.collection("blogs").doc(id).delete().then(() => {
        location.reload();
    })
    .catch((error) => {
        console.log("Error deleting the blog");
    })
} 