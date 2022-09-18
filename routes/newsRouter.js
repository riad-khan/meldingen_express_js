const express = require('express');
const { getAllNews, newsDetails } = require('../Controller/newsController');
const router = express.Router();


router.route('/')
    .get(getAllNews)
router.route('/:id')
    .get(newsDetails)


module.exports = router;