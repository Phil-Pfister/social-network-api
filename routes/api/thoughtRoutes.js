const router = require('express').Router();

const {
    getThoughts,
    getOneThought,
    createThought,
    updateThought,
} = require('../../controllers/thoughtController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getOneThought).put(updateThought)

module.exports = router;