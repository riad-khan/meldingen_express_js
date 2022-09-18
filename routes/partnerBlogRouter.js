const express = require('express');
const { fetchPartnerBlogs, partnerBlogDetails } = require('../Controller/partnerBlogsController')
const router = express.Router();

router.route('/')
    .get(fetchPartnerBlogs)

router.route('/:id')
    .get(partnerBlogDetails)

module.exports = router;