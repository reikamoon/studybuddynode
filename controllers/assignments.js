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

// ASSIGNMENT DETAILS
  app.get("/assignments/:id", function(req, res) {
    // LOOK UP THE Assignment
    var currentUser = req.user;
    console.log("Found the Assignment")
    Assignment.findById(req.params.id).lean()
      .then(assignment => {
        res.render("assignment-details", { assignment,currentUser });
      })
      .catch(err => {
        console.log(err.message);
      });
  });

  // NEW ASSIGNMENT
      app.get('/new-assignment',(req, res) => {
        var currentUser = req.user;
        console.log("New Assignment")
        return res.render('assignment-new', {currentUser});
      })

// CREATE ASSIGNMENT
    app.post("/new-assignment", (req, res) => {
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

// DELETE ASSIGNMENT
  app.get("/assignments/:id/delete", async (req,res) => {
    const assignment = await Assignment
        .findByIdAndRemove(req.params.id)
        .then(() => 'Assignment successfully deleted');
        console.log("Assignment Successfully Deleted.")
        res.redirect('/');
})


};
