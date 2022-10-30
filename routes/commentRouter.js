const express = require('express');
const router = express.Router();
const { createComment, getNewsComments,commentsCount } = require('../Controller/commentController');
const authorization = require('../middlewares/authorization');


router.route('/insert-comments')
    .post(authorization, createComment);

router.route('/get-comments/:id/:page')
    .get(getNewsComments);
    
    router.route('/total-comments/')
    .get(commentsCount)

module.exports = router;