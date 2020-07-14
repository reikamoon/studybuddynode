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
  app.get('/new-class',(req, res) => {
    var currentUser = req.user;
    console.log("New Class")
    return res.render('schedule-new', {currentUser});
    })

//> CREATE CLASS
  app.post("/new-class", (req, res) => {
    var schedule = new Schedule(req.body);
    schedule.author = req.user._id;
      if (req.user) {
          var schedule = new Schedule(req.body);
          schedule.author = req.user._id;

          schedule
              .save()
              .then(schedule => {
                  return User.findById(req.user._id);
              })
              .then(user => {
                  user.classes.unshift(schedule);
                  user.save();
                  // REDIRECT TO THE NEW POST
                  res.redirect('/schedule');
              })
              .catch(err => {
                  console.log(err.message);
              });
      } else {
          return res.status(401); // UNAUTHORIZED
      }

  });

// DELETE CLASS
  app.get("/schedule/:id/delete", async (req,res) => {
    const schedule = await Schedule
        .findByIdAndRemove(req.params.id)
        .then(() => 'Class successfully deleted');
        console.log("Class Successfully Deleted.")
        res.redirect('/schedule');
  })

  //Edit Class
  app.get('/schedule/:id/edit',(req, res) => {
    var currentUser = req.user;
    Schedule.findById(req.params.id).lean()
    .then(schedule => {
      console.log("Edit Class")
      res.render("schedule-edit", { schedule, currentUser });
      })
    .catch(err => {
      console.log(err.message);
        });
  })

  //UPDATE Class
  app.put('/schedule/:id/edit', async (req, res) => {
    let schedule
    console.log(schedule)
    try {
      schedule = await Schedule.findById(req.params.id)
      schedule.name = req.body.name,
      schedule.url = req.body.url,
      schedule.syllabus = req.body.syllabus,
      schedule.grades = req.body.grades,
      schedule.tracker = req.body.tracker,
      await schedule.save()
      res.redirect('/schedule')
    }catch{
      if (notes == null) {
        console.log("Class is null.")
        res.redirect('/schedule')
      }else{
        res.render('schedule-edit', { schedule, currentUser })
      }
      }
  })



};
