const db = require('../models');

// delete all
const deleteAllGuitars = (req, res) => {
  db.Guitar.deleteMany({}, (error, deletedGuitars) => {
    if (error) return console.log(error);
    res.json({
      status: 200, 
      data: deletedGuitars
    });
  });
};

// GET all Guitars
const showAllGuitars = (req, res) => {
  db.Guitar.find({})
  .populate('user')
  .exec((error, allGuitars) => {
    if(error) return res.status(500).json({
      status: 500,
      message: error
    });
    res.status(200).json({
      status: 200,
      data: allGuitars
    });
  });
};


// GET one Post
const show = (req, res) => {
  db.Guitar.findById(req.params.id)
  .populate('user')
  .exec((err, foundGuitar) => {
      if(err) return res.status(500).json({
          status: 500,
          message: err
      });
      res.status(200).json({
          status: 200,
          data: foundGuitar
      });
  });
};


const addGuitar = (req, res) => {
  const guitarData = {...req.body, user: req.session.currentUser.id};
  db.Guitar.create(guitarData, (error, createdGuitar)=>{
      if (error) return console.log(error);
      db.User.findById(createdGuitar.user, (err, foundUser) => {
          if (err) return console.log(err);
          foundUser.guitars.push(createdGuitar._id);
          foundUser.save((err, updatedUser) => {
              if (err) return console.log(err);
              res.json({
                  status: 201,
                  data: updatedUser,
              });
          });
      });
  });
};


// delete one guitar
const deleteGuitar = (req, res) => {
  db.Guitar.findByIdAndDelete(req.params.id, (error, deletedGuitar) => {
    if (error) return console.log(error);
    res.json({
      status: 200,
      data: deletedGuitar
    });
  });
}


// Update one Guitar
const updateGuitar = (req, res) => {
  db.Guitar.findByIdAndUpdate(req.params.id, req.body, {new: true},(err, updatedGuitar) => {
      if (err) return console.log(err);
      res.json({
          status: 201,
          data: updatedGuitar,
      });
  });
};


module.exports = {
  deleteAllGuitars,
  showAllGuitars,
  show,
  addGuitar,
  deleteGuitar,
  updateGuitar
};