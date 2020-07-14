const Schedule = require('../models/schedule');
const User = require('../models/user');

module.exports = app => {
//> SCHEDULE INDEX
  app.get('/schedule', (req, res) => {
    var currentUser = req.user;
    console.log('schedule')
    if (req.user) {
    Schedule.find({}).lean()
    .then(schedules => {
      res.render("schedule-index", { schedules, currentUser });
    })
  .catch(err => {
    console.log(err.message);
  });
  }else{
    return res.render("unauthorized");
  }
})

//> NEW CLASS
  app.get('/schedule/new',(req, res) => {
    console.log("New Class")
    return res.render('schedule-new', {});
    })

//> CREATE CLASS
  app.post('/schedule/new', (req, res) => {
    // INSTANTIATE INSTANCE OF SCHEDULE MODEL
    const schedule = new Schedule(req.body);

    // SAVE INSTANCE OF CLASS MODEL TO DB
    schedule.save((err, schedule) => {
      // REDIRECT TO THE ROOT
      return res.redirect(`/schedule`);
    })
  });

};
