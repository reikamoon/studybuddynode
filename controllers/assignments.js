const Assignment = require('../models/assignment');

module.exports = app => {
  // INDEX
    app.get('/assignments', (req, res) => {
      console.log('index')
      Assignment.find({}).lean()
      .then(assignments => {
        res.render("assignments-index", { assignments });
        })
      .catch(err => {
        console.log(err.message);
          });
        })

  // NEW ASSIGNMENT
      app.get('/assignments/new',(req, res) => {
        console.log("New Assignment")
        return res.render('assignment-new', {});
      })

  // CREATE ASSIGNMENT
  app.post('/assignments/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const assignment = new Assignment(req.body);

    // SAVE INSTANCE OF ASSIGNMENT MODEL TO DB
    assignment.save((err, assignment) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

};
