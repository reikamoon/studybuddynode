const User = require('../models/user');
const Request = require('../models/request');
const Comment = require('../models/comment');

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

// REQUEST DETAILS
  app.get("/helpboard/:id", function(req, res) {
    // LOOK UP THE POST
    var currentUser = req.user;
    Request.findById(req.params.id).populate('comments').lean()
      .then(request => {
        res.render("request-details", { request,currentUser });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

// NEW REQUEST
    app.get('/new-request',(req, res) => {
      var currentUser = req.user;
      console.log("New Request")
      return res.render('request-new', {currentUser});
    })

// CREATE REQUEST
  app.post("/new-request", (req, res) => {
    var request = new Request(req.body);
    request.author = req.user._id;
      if (req.user) {
          var request = new Request(req.body);
          request.author = req.user._id;

          request
              .save()
              .then(request => {
                  return User.findById(req.user._id);
              })
              .then(user => {
                  user.requests.unshift(request);
                  user.save();
                  // REDIRECT TO THE INDEX
                  res.redirect('/helpboard');
              })
              .catch(err => {
                  console.log(err.message);
              });
      } else {
          return res.status(401); // UNAUTHORIZED
      }

  });

// DELETE Request
    app.get("/helpboard/:id/delete", async (req,res) => {
      const request = await Request
          .findByIdAndRemove(req.params.id)
          .then(() => 'Request successfully deleted');
          console.log("Request Successfully Deleted.")
          res.redirect('/helpboard');
  })

  };
