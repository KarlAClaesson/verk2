const express = require('express');
const app = express();
const { pool } = require('./dbConfig');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const initializePassport = require('./passportConfig');


initializePassport(passport);

const PORT = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.get('/', (req,res) => {
    res.render('index');
});

app.get('/register', (req,res) => {
    res.render('register.ejs');
});

app.get('/login', (req,res) => {
    res.render('login.ejs');
});

app.get('/dashboard', (req,res) => {
    res.render('dashboard.ejs', {user: req.user.name});
});

app.post("/login",
 passport.authenticate('local',{
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true
 })
);

app.listen(PORT, () => {
    console.log(`Server keyrir á porti ${PORT}`)
});