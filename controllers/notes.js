const Notes = require('../models/notes');
const User = require('../models/user');

module.exports = app => {
//> NOTES INDEX
  app.get('/notes', (req, res) => {
    var currentUser = req.user;
    console.log('notes')
    if (req.user) {
    Notes.find({}).lean()
    .then(notes => {
      res.render("notes-index", { notes, currentUser });
    })
  .catch(err => {
    console.log(err.message);
  });
  }else{
    return res.render("unauthorized");
  }
  })

//> NEW NOTE
  app.get('/notes/new',(req, res) => {
      console.log("New Note")
      return res.render('notes-new', {});
        })

//> CREATE NOTE
  app.post('/notes/new', (req, res) => {
  // INSTANTIATE INSTANCE OF POST MODEL
  const notes = new Notes(req.body);

  // SAVE INSTANCE OF NOTES MODEL TO DB
  notes.save((err, notes) => {
    // REDIRECT TO THE ROOT
    return res.redirect('/notes');
  })
  });
};
