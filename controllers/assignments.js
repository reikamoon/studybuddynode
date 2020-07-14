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


//Edit Assignment
app.get('/assignments/:id/edit',(req, res) => {
  var currentUser = req.user;
  Assignment.findById(req.params.id).lean()
  .then(assignment => {
    console.log("Edit Assignment")
    res.render("assignment-edit", { assignment, currentUser });
    })
  .catch(err => {
    console.log(err.message);
      });
})


// EDIT ASSIGNMENT
  app.put("/assignments/:id/edit", (req,res) => {
    Assignment.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, assignment) => {
      //Handle any Database Errors
      if (err) return console.log(err);
      return res.send(assignment)
    })
      console.log("Assignment Successfully Updated.")
      res.redirect('/');
})

// //EDIT ASSIGNMENT
// app.get('/assignments/:id/edit', async (req, res) => {
//   var currentUser = req.user;
//   try {
//     const assignment = await Assignment.findById(req.params.id)
//     res.render('assignment-edit', { assignment, currentUser });
//   } catch {
//     res.redirect('/')
//   }
// })
// //EDIT ASSIGNMENT
// app.put('/assignments/:id', async (req, res) => {
//   let assignment
//   console.log(assignment)
//   try {
//     assignment = await Assignment.findById(req.params.id)
//     assignment.name = req.body.name,
//     assignment.url = req.body.url,
//     assignment.description = req.body.description,
//     assignment.duedate = req.body.duedate,
//     assignment.dropbox = req.body.dropbox
//     await assignment.save()
//     res.redirect('/')
//   }catch{
//     if (assignment == null) {
//       console.log("Assignment is null.")
//       res.redirect('/')
//     }else{
//       res.render('assignment-edit', { assignment, currentUser })
//     }
//     }
// })

};
