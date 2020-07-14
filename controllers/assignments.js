const Assignment = require('../models/assignment');
const User = require('../models/user');

module.exports = app => {
  // ASSIGNMENT INDEX
    app.get('/', (req, res) => {
      var currentUser = req.user;
      console.log('index')
      if (req.user) {
    Assignment.find({}).lean()
      .then(assignments => {
        res.render("assignments-index", { assignments, currentUser });
        })
      .catch(err => {
        console.log(err.message);
          });
        }else{
          return res.render("unauthorized");
        }
        })

  // NEW ASSIGNMENT
      app.get('/assignments/new',(req, res) => {
        var currentUser = req.user;
        console.log("New Assignment")
        return res.render('assignment-new', {currentUser});
      })

// CREATE ASSIGNMENT
    app.post("/assignments/new", (req, res) => {
      var assignment = new Assignment(req.body);
      assignment.author = req.user._id;
        if (req.user) {
            var assignment = new Assignment(req.body);
            assignment.author = req.user._id;

            assignment
                .save()
                .then(assignment => {
                    return User.findById(req.user._id);
                })
                .then(user => {
                    user.assignments.unshift(assignment);
                    user.save();
                    // REDIRECT TO THE NEW POST
                    res.redirect('/');
                })
                .catch(err => {
                    console.log(err.message);
                });
        } else {
            return res.status(401); // UNAUTHORIZED
        }

    });

};
