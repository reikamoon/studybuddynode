const Notes = require('../models/notes');

module.exports = app => {
//NOTES INDEX
    app.get('/notes', (req, res) => {
      console.log('notes')
      Notes.find({}).lean()
      .then(schedules => {
        res.render("notes-index", { notes });
      })
    .catch(err => {
      console.log(err.message);
    });
  })

};
