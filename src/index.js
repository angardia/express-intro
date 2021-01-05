const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;
//USER REST API
const users = [];
let counter = 1;
//PHOTO REST API
const photos = [];
let counter1 = 1;

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

//CREATE NEW USER
app.put('/user', (req, res) => {

    const { username, password } = req.body;
    if (!username || !password) {
        res.status(400).send("Error has been located between the screen and the chair");
        return;
    }
    if (username.length < 3 || password.length < 6) {
        res.status(400).send("Error has been located between the screen and the chair");
        return;
    }

    const newUser = {
        id: counter,
        username,
        password

    };
    counter++;
    users.push(newUser);
    res.sendStatus(201);
});

//SHOW ALL USERS
app.get("/user", (req, res) => {
    res.send(users);
});

//SHOW USER BY ID
app.get('/user/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    const reqestedUser = users.find(user => user.id === userId);
    if (!reqestedUser) {
        res.status(404).send("Error has been located between the screen and the chair");
        return;
    }
    res.send(reqestedUser);
});

//DELETE USER BY ID
app.delete("/user/:id", (req, res) => {
    const userId = parseInt(req.params.id);
    const userToDelete = users.find(user => user.id === userId);
    if (!userToDelete) {
        res.status(404).send("Error has been located between the screen and the chair");
        return;
    }
    users.splice(users.findIndex(user => user.id === userToDelete.id), 1);
    res.sendStatus(204);

});

//LOGIN USER
app.post("/user/login",(req,res)=>{
    const {username, password} = req.body;
    if (!username || !password) {
        res.status(400).send("Error has been located between the screen and the chair");
        return;
    }
   const doesExist = users.some(user=> user.username === username && user.password === password);
   if(!doesExist){
    res.status(403).send("Error has been located between the screen and the chair");
    return;
   }
   res.sendStatus(200);

});

//EDIT USER
app.post("/user/:id", (req, res) => {
   const {username, password} = req.body;
    const userId = parseInt(req.params.id);
    const userToEdit = users.find(user => user.id === userId);
    const index = users.findIndex(user => user.id === userToEdit.id);
    if (!userToEdit) {
        res.status(404).send("Error has been located between the screen and the chair");
        return;
    }
    if (username.length < 3 || password.length < 6) {
        res.status(400).send("Error has been located between the screen and the chair");
        return;
    }

    const updateUser = {
        id: userId,
        username,
        password
    };
    users.splice(index,1, updateUser);
    res.sendStatus(200);
});

//CREATE NEW PHOTO
app.put('/photo', (req, res) => {

    const { title, filename, type } = req.body;
    if (!title || !filename || !type) {
        res.status(400).send("Error has been located between the screen and the chair");
        return;
    }
    if (title.length < 3 || filename.length < 6 || !["jpg","png","jpeg","gif","bmp"].includes(type)) {
        res.status(400).send("Error has been located between the screen and the chair");
        return;
    }

    const newPhoto = {
        id: counter1,
        title,
        filename,
        type
    };
    counter1++;
    photos.push(newPhoto);
    res.sendStatus(201);
});

//SHOW ALL PHOTOS
app.get("/photo", (req, res) => {
    res.send(photos);
});

//SHOW PHOTO BY ID
app.get('/photo/:id', (req, res) => {
    const photoId = parseInt(req.params.id);
    const reqestedphoto = photos.find(photo => photo.id === photoId);
    if (!reqestedphoto) {
        res.status(404).send("Error has been located between the screen and the chair");
        return;
    }
    res.send(reqestedphoto);
});

//DELETE PHOTO BY ID
app.delete("/photo/:id", (req, res) => {
    const photoId = parseInt(req.params.id);
    const photoToDelete = photos.find(photo => photo.id === photoId);
    if (!photoToDelete) {
        res.status(404).send("Error has been located between the screen and the chair");
        return;
    }
    photos.splice(photos.findIndex(photo => photo.id === photoToDelete.id), 1);
    res.sendStatus(204);

});

//EDIT PHOTO
app.post("/photo/:id", (req, res) => {
    const { title, filename, type } = req.body;
     const photoId = parseInt(req.params.id);
     const photoToEdit = photos.find(photo => photo.id === photoId);
     const index = photos.findIndex(photo => photo.id === photoToEdit.id);
     if (!photoToEdit) {
         res.status(404).send("Error has been located between the screen and the chair");
         return;
     }
     if (title.length < 3 || filename.length < 6 ||  !["jpg","png","jpeg","gif","bmp"].includes(type) ) {
         res.status(400).send("Error has been located between the screen and the chair");
         return;
     }
 
     const updatePhoto = {
         id: photoId,
         title,
         filename,
         type: photoToEdit.type
     };
     photos.splice(index,1, updatePhoto);
     res.sendStatus(200);
 });

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});