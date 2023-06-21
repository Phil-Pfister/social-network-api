const router = require('express').Router();

const {
    getUsers,
    getOneUser,
    createUser,
    updateUser,
    addFriend,
    deleteUser,
    removeFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser)

router.route('/:id').get(getOneUser).put(updateUser).delete(deleteUser);

router.route('/:userId/friends/:friendId').put(addFriend).delete(removeFriend);





module.exports = router;