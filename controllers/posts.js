const Assignment = require('../models/assignment');
const Schedule = require('../models/schedule');

module.exports = app => {
  // NEW ASSIGNMENT
      app.get('/assignments/new',(req, res) => {
        console.log("New Assignment")
        return res.render('assignment-new', {});
      })

    // NEW CLASS
        app.get('/schedule/new',(req, res) => {
          console.log("New Class")
          return res.render('schedule-new', {});
          })


  // CREATE ASSIGNMENT
  app.post('/assignments/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const Assignment = new Assignment(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, assignment) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });

  // CREATE CLASS
  app.post('/schedule/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const Schedule = new Schedule(req.body);

    // SAVE INSTANCE OF POST MODEL TO DB
    post.save((err, schedule) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });
};
