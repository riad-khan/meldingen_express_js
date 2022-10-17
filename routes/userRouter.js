const express = require('express');
const { signUp,signIn } = require('../Controller/userController');
const authorization = require('../middlewares/authorization');

const router = express.Router();

router.route('/sign-up')
    .post(signUp);

router.route('/sign-in')
        .post(signIn)

        router.route('/user/:id')
        .get(authorization,userInfo)


        

    
 module.exports = router