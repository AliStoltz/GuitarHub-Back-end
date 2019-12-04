const db = require('../models');

const showAllComments = (req, res) => {
  db.Comment.find({})
  .populate('user')
  .exec((err, allComments) => {
    if (err) return console.log(err);
    res.json({
      status: 200,
      data: allComments,
    });
  });
};

const addComment = (req, res) => {
  const commentData = {...req.body, user: req.session.currentUser.id}
  db.Comment.create(commentData, (err, createdComment) => {
    if (err) return console.log(err);
    db.Guitar.findById(req.params.id, (err, foundGuitar) => {
      if (err) return console.log(err);
      foundGuitar.comments.push(createdComment);
      foundGuitar.save((err, savedGuitar) => {
        if (err) console.log(err);
        res.json({
          status: 200,
          data: savedGuitar,
        });
      });
    });
  });
};

const deleteAllComments = (req, res) => {
  db.Comment.deleteMany({}, (err, deletedComments) => {
    if (err) return console.log(err);
    res.json({
      status: 200,
      data: deletedComments
    });
  });
};


module.exports = {
  showAllComments,
  addComment,
  deleteAllComments,
}