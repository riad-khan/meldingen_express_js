const express = require('express')
const {fetchMeldingen,meldingenDetails} = require('../Controller/meldingenController');
const router = express.Router();

router.route('/')
        .get(fetchMeldingen);

router.route('/:id')   
        .get(meldingenDetails)    

 module.exports = router

