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

// NOTES DETAILS
    app.get("/notes/:id", function(req, res) {
      // LOOK UP THE NOTES
      var currentUser = req.user;
      console.log("Found the Note!")
      Notes.findById(req.params.id).lean()
        .then(notes => {
          res.render("notes-details", { notes, currentUser });
        })
        .catch(err => {
          console.log(err.message);
        });
    });

//> NEW NOTE
  app.get('/new-note',(req, res) => {
      console.log(req.user)
      var currentUser = req.user;
      console.log("New Note")
      return res.render('notes-new', {currentUser});
        })

//> CREATE NOTE
  app.post("/new-note", (req, res) => {
    var notes = new Notes(req.body);
    notes.author = req.user._id;
      if (req.user) {
          var notes = new Notes(req.body);
          notes.author = req.user._id;

          notes
              .save()
              .then(notes => {
                  return User.findById(req.user._id);
              })
              .then(user => {
                  user.notes.unshift(notes);
                  user.save();
                  // REDIRECT TO THE INDEX
                  res.redirect('/notes');
              })
              .catch(err => {
                  console.log(err.message);
              });
      } else {
          return res.status(401); // UNAUTHORIZED
      }

  });

// DELETE NOTE
    app.get("/notes/:id/delete", async (req,res) => {
      const notes = await Notes
          .findByIdAndRemove(req.params.id)
          .then(() => 'Note successfully deleted');
          console.log("Note Successfully Deleted.")
          res.redirect('/notes');
    })

    //Edit Notes
    app.get('/notes/:id/edit',(req, res) => {
      var currentUser = req.user;
      Notes.findById(req.params.id).lean()
      .then(notes => {
        console.log("Edit Notes")
        res.render("note-edit", { notes, currentUser });
        })
      .catch(err => {
        console.log(err.message);
          });
    })

    //UPDATE NOTES
    app.put('/notes/:id/edit', async (req, res) => {
      let notes
      console.log(notes)
      try {
        notes = await Notes.findById(req.params.id)
        notes.title = req.body.title,
        notes.content = req.body.content,
        await notes.save()
        res.redirect('/')
      }catch{
        if (notes == null) {
          console.log("Notes is null.")
          res.redirect('/')
        }else{
          res.render('notes-edit', { notes, currentUser })
        }
        }
    })

};
