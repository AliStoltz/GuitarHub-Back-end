const express = require('express');
const router = express.Router();

const ctrl = require('../controllers');

// PATH = /api/v1/comments

// GET all comments
router.get('/all', ctrl.comments.showAllComments);

// ADD new comment
router.post('/:id/new', ctrl.comments.addComment);

// DELETE all comments
router.delete('/all', ctrl.comments.deleteAllComments);

module.exports = router;