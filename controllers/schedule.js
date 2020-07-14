const Schedule = require('../models/schedule');

module.exports = app => {
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

// NEW CLASS
  app.get('/schedule/new',(req, res) => {
    console.log("New Class")
    return res.render('schedule-new', {});
    })


};
