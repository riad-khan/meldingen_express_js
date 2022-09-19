const express = require('express');
const router = express.Router();
const { getBlogs, blogDetails } = require('../Controller/blogController');

router.route('/')
    .get(getBlogs)

router.route('/:id')
    .get(blogDetails)

module.exports = router;