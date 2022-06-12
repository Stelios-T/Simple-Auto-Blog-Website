let ul = document.querySelector('.links-container');

auth.onAuthStateChanged((user) => {
    
    if ((user) && (auth.currentUser.email.split('@')[0] == "stelios.toump")) {
        ul.innerHTML +=`
        <li class="link-item"><a href="/users" onclick="users()" class="link">users</a></li>
        `
    }

    if(user) {
        //user is loged
        ul.innerHTML += `
        <li class="link-item"><a href="/admin" class="link">Dashboard</a></li>
        <li class="link-item"><a href="#" onclick="logoutUser()" class="link">Logout</a></li>
      `

    } else {
        ul.innerHTML += `
        <li class="link-item"><a href="/admin" class="link">Login</a></li>
        `
    }
}) 