const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

//PATH = /api/v1/guitars


//GET All guitars
router.get('/all', ctrl.guitars.showAllGuitars);

//GET All User guitars
router.get('/user', ctrl.guitars.showUserGuitars);

// GET One Guitar
router.get('/:id', ctrl.guitars.show);

// ADD guitar
router.post('/new', ctrl.guitars.addGuitar);

// UPDATE guitar
router.put('/:id', ctrl.guitars.updateGuitar);

// Find guitar 
// router.get('/find', ctrl.guitars.findGuitars);

// DELETE guitar
router.delete('/:id', ctrl.guitars.deleteGuitar);

module.exports = router;
