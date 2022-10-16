const express = require('express');
const { getAllNews, newsDetails, recentNews, filteredNews, fetchRegios, getOtherNews, getMoreOtherNews,recentMeldingen } = require('../Controller/newsController');
const router = express.Router();


router.route('/')
    .get(getAllNews)
router.route('/:id')
    .get(newsDetails)

router.route('/recent/news')
    .get(recentNews)

router.route('/other/news')
    .get(getOtherNews)

router.route('/getMoreOtherNews/:page')
    .get(getMoreOtherNews)


router.route('/filter-news/:region')
    .get(filteredNews)

router.route('/fetch/regios')
    .get(fetchRegios)

    router.route('/recent/meldingen').get(recentMeldingen)


module.exports = router;