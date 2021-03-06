const Comment = require('../models/comment');
const User = require('../models/user');
const Request = require('../models/request');

module.exports = function(app) {
  // CREATE Comment
   app.post("/helpboard/:requestId/comments", function (req, res) {
       const comment = new Comment(req.body);
       comment.author = req.user._id;
       comment
           .save()
           .then(comment => {
               return Promise.all([
                   Request.findById(req.params.requestId)
               ]);
           })
           .then(([request, user]) => {
               request.comments.unshift(comment);
               return Promise.all([
                   request.save()
               ]);
           })
           .then(request => {
               res.redirect(`/helpboard/${req.params.requestId}`);
           })
           .catch(err => {
               console.log(err);
           });
   });

};
