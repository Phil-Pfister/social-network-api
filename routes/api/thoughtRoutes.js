const router = require('express').Router();
// imports functions from the thought controller
const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
    createReact,
    deleteThought,
    removeReaction,
} = require('../../controllers/thoughtController');
// sets routes for controller functions
router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getOneThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReact);

router.route('/:thoughtId/reactions/:reactId').delete(removeReaction);

module.exports = router;