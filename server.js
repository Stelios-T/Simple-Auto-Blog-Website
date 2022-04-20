//install all packages we need
const express = require('express');
const path = require('path');

const fileupload = require('express-fileupload');

//store your public folder path inside a variable.
let initial_path = path.join(__dirname, "public");

//Create expressJS server. 
//Set public folder path to static path. 
//Also use app.use(fileupload()) to enable file uploads.
const app = express();
app.use(express.static(initial_path));

app.use(fileupload());

//Make a home route and in response send home.html file. 
app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})

app.post('/upload', (req, res) => {
    let file = req.files.image;
    let date = new Date();
    // image name
    let imagename = date.getDate() + date.getTime() + file.name;
    // image upload path
    let path = 'public/uploads/' + imagename;

    // create upload
    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            // our image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})
app.get("/admin", (req, res) => {
    res.sendFile(path.join(initial_path, "dashboard.html"));
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "blog.html"));
})

app.get("/:blog/editor", (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})


app.use((req, res) => {
    res.json("404");
})

//Run your server on 3000 port.
app.listen("3000", () => {
    console.log('listening......');
})