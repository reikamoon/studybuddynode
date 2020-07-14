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
//Use Main as Our Default Layout
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))

// Use handlebars to render
app.set('view engine', 'handlebars');

//Tell Our App to send to the hello world message to our homepage
app.get('/', (req, res) => {
  res.render('home', { msg: 'handlebars are dumb' });
})


//Choose a Port to listen on
const port = process.env.PORT || 3000;

// Tell the app what port to listen on
app.listen(port, () => {
  console.log('App listening on port 3000!')
})
