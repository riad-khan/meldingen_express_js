const express = require('express');
const { getAllNews, newsDetails, recentNews, filteredNews, fetchRegios } = require('../Controller/newsController');
const router = express.Router();


router.route('/')
    .get(getAllNews)
router.route('/:id')
    .get(newsDetails)

router.route('/recent/news')
    .get(recentNews)

router.route('/filter-news/:region')
    .get(filteredNews)

router.route('/fetch/regios')
    .get(fetchRegios)


module.exports = router;