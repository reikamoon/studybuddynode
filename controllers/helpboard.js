const User = require('../models/user');
const Request = require('../models/request');
module.exports = app => {
// HELP BOARD
    app.get('/helpboard', (req, res) => {
      var currentUser = req.user;
      console.log('index')
      if (req.user) {
      Request.find({}).lean()
      .then(requests => {
        res.render("helpboard", { requests, currentUser });
        })
      .catch(err => {
        console.log(err.message);
          });
        }else{
          return res.render("unauthorized");
        }
        })

// NEW REQUEST
    app.get('/helpboard/new',(req, res) => {
      var currentUser = req.user;
      console.log("New Request")
      return res.render('request-new', {});
    })

// CREATE REQUEST
app.post('/helpboard/new', (req, res) => {
  var currentUser = req.user;
  // INSTANTIATE INSTANCE OF POST MODEL
  const request = new Request(req.body);

  // SAVE INSTANCE OF REQUEST MODEL TO DB
  request.save((err, request) => {
    // REDIRECT TO THE ROOT
    return res.redirect(`/`);
  })
});

  };
