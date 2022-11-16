const express = require('express');
const router = express.Router();

const {getHomePageAds} = require('../Controller/adsController');

router.route('/home').get(getHomePageAds)

module.exports = router