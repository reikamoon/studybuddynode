var Request = require('../models/request')
var Comment = require('../models/comment')

module.exports = app => {
  // NEW REPLY
  app.get('/helpboard/:requestId/comments/:commentId/replies/new', (req, res) => {
    let request
    Request.findById(req.params.requestId).lean()
      .then(r => {
        request = r
        return Comment.findById(req.params.commentId).lean()
      })
      .then(comment => {
        res.render('replies-new', { request, comment })
      })
      .catch(err => {
        console.log(err.message)
      })
  })

  // CREATE REPLY
  app.post('/helpboard/:requestId/comments/:commentId/replies', (req, res) => {
    // TURN REPLY INTO A COMMENT OBJECT
    const reply = new Comment(req.body)
    reply.author = req.user._id
    // LOOKUP THE PARENT POST
    Request.findById(req.params.requestId).lean()
      .then(post => {
        // FIND THE CHILD COMMENT
        Promise.all([
          reply.save(),
          Comment.findById(req.params.commentId).lean()
        ])
          .then(([reply, comment]) => {
            // ADD THE REPLY
            comment.comments.unshift(reply._id)

            return Promise.all([
              comment.save()
            ])
          })
          .then(() => {
            res.redirect(`/posts/${req.params.postId}`)
          })
          .catch(console.error)
        // SAVE THE CHANGE TO THE PARENT DOCUMENT
        return post.save()
      })
  })
}
