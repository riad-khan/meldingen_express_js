const express = require('express');
const router = express.Router();
const { meldingenStats } = require('../Controller/ChartController')

router.route('/meldingen/:hour/:region')
        .get(meldingenStats);

module.exports = router