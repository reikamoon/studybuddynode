require('dotenv').config();
// Initialize express
const express = require('express')
var app = express()

//Cookies and Tokens, oh my!
var cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

app.use(express.static('public'));

app.use(cookieParser()); // Add this after you initialize express.

// override with POST having ?_method=DELETE or ?_method=PUT
app.use(methodOverride('_method'))

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

// Use Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Add after body parser initialization!
app.use(expressValidator());


//Use Main as Our Default Layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

// Use handlebars to render
app.set('view engine', 'handlebars');

//Check Authentication in Every Route
var checkAuth = (req, res, next) => {
  console.log("Checking authentication");
  if (typeof req.cookies.nToken === "undefined" || req.cookies.nToken === null) {
    req.user = null;
  } else {
    var token = req.cookies.nToken;
    var decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  console.log("Signed in!")
  next();
};
app.use(checkAuth);

//Set DB
require('./data/studybuddy-db');

//Requirements Controllers
require('./controllers/assignments.js')(app);
require('./controllers/notes.js')(app);
require('./controllers/schedule.js')(app);
require('./controllers/auth.js')(app);
require('./controllers/helpboard.js')(app);
require('./controllers/comments.js')(app);

//Choose a Port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
