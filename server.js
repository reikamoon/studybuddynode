require('dotenv').config();
// Initialize express
const express = require('express')
const app = express()

//Cookies and Tokens, oh my!
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

//handlebars
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(handlebars),
});

//Body parser
app.use(express.static(__dirname));
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const expressSession = require('express-session')({
  secret: 'secret',
  resave: false,
  saveUninitialized: false
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressSession);

/* MONGOOSE SETUP */
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

mongoose.connect('mongodb://localhost/MyDatabase',
  { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;
const UserDetail = new Schema({
  username: String,
  password: String
});

UserDetail.plugin(passportLocalMongoose);
const UserDetails = mongoose.model('userInfo', UserDetail, 'userInfo');

/*  PASSPORT SETUP  */
const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

/* PASSPORT LOCAL AUTHENTICATION */
passport.use(UserDetails.createStrategy());

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());


// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());


//Use Main as Our Default Layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

// Use handlebars to render
app.set('view engine', 'handlebars');

//Set DB
require('./data/studybuddy-db');

//Requirements Controllers
require('./controllers/assignments.js')(app);
require('./controllers/notes.js')(app);
require('./controllers/schedule.js')(app);
require('./controllers/auth.js')(app);


/* REGISTER SOME USERS */

//Choose a Port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
