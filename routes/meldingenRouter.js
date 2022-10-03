const express = require('express')
const { fetchMeldingen, meldingenDetails, filterMeldingen, searchComplete } = require('../Controller/meldingenController');
const router = express.Router();

router.route('/scroll-more/:page')
        .get(fetchMeldingen);

router.route('/:id')
        .get(meldingenDetails)

router.route('/filter-meldingen/:regio/:page')
        .get(filterMeldingen)
router.route('/auto/search/')
        .get(searchComplete)

module.exports = router

