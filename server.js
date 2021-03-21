const express = require('express');
const app = express();
const mongoose = require('mongoose');


require('dotenv').config({ path: './config/.env' });
const url = process.env.MONGO_URI;
const User = require("./Models/User");
app.use(express.json());
 
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    err ? console.log(err) : console.log('connection data base')
})

const port = 4000;
app.listen(port, (err) => {
    err ? console.log(err) : console.log('run server')
});


app.get('/users', (req,res) => {
    User.find()
    .then((el) => res.json(el))
    .catch((err) => console.log(err))
});


app.post("/user_add", (req, res) => {
    const { firstName, lastName, email, password } = req.body;
    let newUser = new User({ firstName, lastName, email, password });
    newUser
        .save()
        .then(() => res.json({ msg: "User added " }))
        .catch((err) => console.log(err));
});


app.put('/user_edit/:id', (req,res) => {
    User.findByIdAndUpdate(req.params.id, { $set: { ...req.body } }, (err) => {
        if (err) throw err;
        User.findById(req.params.id)
            .then((el) => res.json(el))
            .catch((err) => console.log(err));
    });
});

app.delete("/delete_user/:id", (req, res) => {
    User.findByIdAndDelete(req.params.id)
        .then(() => res.json({ msg: "User deleted." }))
        .catch((err) => console.log(err));
});