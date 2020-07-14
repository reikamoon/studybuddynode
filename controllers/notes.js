const Notes = require('../models/note');

module.exports = app => {
//> NOTES INDEX
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

//> NEW NOTE
  app.get('/notes/new',(req, res) => {
      console.log("New Note")
      return res.render('notes-new', {});
        })

//> CREATE NOTE
  app.post('/notes/new', (req, res) => {
  // INSTANTIATE INSTANCE OF POST MODEL
  const note = new Note(req.body);

  // SAVE INSTANCE OF ASSIGNMENT MODEL TO DB
  note.save((err, note) => {
    // REDIRECT TO THE ROOT
    return res.redirect(`/notes`);
  })
  });
};
