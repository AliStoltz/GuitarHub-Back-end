const express = require('express');
const router = express.Router();
const ctrl = require('../controllers')

//PATH = /api/v1/users

// GET all users
router.get('/all', ctrl.users.showAllUsers);

//GET by ID
router.get('/:id', ctrl.users.show);

//PUT Update
router.put('/:id', ctrl.users.updateUser);

module.exports = router;