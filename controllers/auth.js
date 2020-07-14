const User = require("../models/user");

module.exports = (app) => {
// SIGN UP FORM
  app.get("/signup", (req, res) => {
    res.render("signup");
  });
// SIGN UP POST
 app.post("/signup", (req, res) => {
   // Create User
   const user = new User(req.body);

   user
     .save()
     .then(user => {
       res.redirect("/");
     })
     .catch(err => {
       console.log(err.message);
     });
 });
}
