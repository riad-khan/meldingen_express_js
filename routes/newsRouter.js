const express = require('express');
const { getAllNews, newsDetails, recentNews } = require('../Controller/newsController');
const router = express.Router();


router.route('/')
    .get(getAllNews)
router.route('/:id')
    .get(newsDetails)

router.route('/recent/news')
    .get(recentNews)


module.exports = router;