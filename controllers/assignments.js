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
        return res.render('assignment-new', {});
      })

  // CREATE ASSIGNMENT
  app.post('/assignments/new', (req, res) => {
    var currentUser = req.user;
    // INSTANTIATE INSTANCE OF POST MODEL
    const assignment = new Assignment(req.body);

    // SAVE INSTANCE OF ASSIGNMENT MODEL TO DB
    assignment.save((err, assignment) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

};
