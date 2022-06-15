//install all packages
const express = require('express');
const path = require('path');

const fileupload = require('express-fileupload');

//public folder path inside a variable.
let initial_path = path.join(__dirname, "public");

//expressJS server. 
//public folder path to static path. 
//use app.use(fileupload()) to enable file uploads.
const app = express();
app.use(express.static(initial_path));

app.use(fileupload());

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

    file.mv(path, (err, result) => {
        if(err){
            throw err;
        } else{
            //image upload path
            res.json(`uploads/${imagename}`)
        }
    })
})

app.get("/admin", (req, res) => {
    res.sendFile(path.join(initial_path, "dashboard.html"));
})

app.get("/users", (req, res) => {
    res.sendFile(path.join(initial_path, "users.html"));
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

/* app.listen(process.env.PORT || 3000, '0.0.0.0', () => {
    console.log('listening......');
}) */

const port = process.env.PORT || 5000;
const host = '0.0.0.0'

app.listen(port, host, () => {
    console.log('listening......');
})
