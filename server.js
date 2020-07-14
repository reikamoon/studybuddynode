// Initialize express
const express = require('express')
const app = express()

//handlebars
const handlebars = require('handlebars');
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({
    defaultLayout: 'main',
    handlebars: allowInsecurePrototypeAccess(handlebars),
});

//Body parser
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');

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
require('./controllers/posts.js')(app);

//Tell Our App to send to the hello world message to our homepage
app.get('/', (req, res) => {
  res.render('home', { msg: 'home' });
})

//Choose a Port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
