const Schedule = require('../models/schedule');

module.exports = app => {
//> SCHEDULE INDEX
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
