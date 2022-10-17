const express = require('express');
const { signUp, signIn, userInfo, updateProfile,fetchUserComments,deleteComments } = require('../Controller/userController');
const authorization = require('../middlewares/authorization');

const router = express.Router();

router.route('/sign-up')
    .post(signUp);

router.route('/sign-in')
    .post(signIn)

router.route('/user-info/:id')
    .get(authorization, userInfo);

router.route('/update/profile').post(authorization,updateProfile);
router.route('/comments/:id').get(authorization,fetchUserComments);
router.route('/delete-comments/:id/:user_id').delete(deleteComments)




module.exports = router