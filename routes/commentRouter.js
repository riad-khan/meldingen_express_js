const express = require('express');
const router = express.Router();
const { createComment, getNewsComments } = require('../Controller/commentController');
const authorization = require('../middlewares/authorization');


router.route('/:id')
    .post(authorization, createComment);

router.route('/get-comments/:id')
    .get(getNewsComments)

module.exports = router;