const Assignment = require('../models/assignment');
const Schedule = require('../models/schedule');

module.exports = app => {
  // INDEX
    app.get('/', (req, res) => {
      console.log('index')
      Assignment.find({}).lean()
      .then(assignments => {
        res.render("assignments-index", { assignments });
        })
      .catch(err => {
        console.log(err.message);
          });
        })

  //SCHEDULE INDEX
    app.get('/schedule', (req, res) => {
      console.log('schedule')
      Schedule.find({}).lean()
      .then(schedules => {
        res.render("schedule-index", { schedules });
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

    // NEW CLASS
        app.get('/schedule/new',(req, res) => {
          console.log("New Class")
          return res.render('schedule-new', {});
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

  // CREATE CLASS
  app.post('/schedule/new', (req, res) => {
    // INSTANTIATE INSTANCE OF POST MODEL
    const schedule = new Schedule(req.body);

    // SAVE INSTANCE OF CLASS MODEL TO DB
    schedule.save((err, schedule) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/`);
    })
  });


};
