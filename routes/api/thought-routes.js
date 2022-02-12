const router = require('express').Router();
const {
    getAllThoughts,
    getThoughtById,
    addThought,
    updateThought,
    removeThought,
    addReaction,
    removeReaction
} = require('../../controllers/thought-controller');

// routes for api/thoughts
router
    .route('/')
    .get(getAllThoughts)
    .post(addThought);

// routes for api/thoughts/:thoughtId
router
    .route('/:thoughtId')
    .get(getThoughtById)
    .put(updateThought)
    .delete(removeThought);

// routes for api/thoguhts/:thoughtId/reactions
router
    .route('/:thoughtId/reactions')
    .post(addReaction);
    
// routes for api/thoughts/:thoughtId/reactions/:reactionId
router
    .route('/:thoughtId/reactions/:reactionId')
    .delete(removeReaction);

module.exports = router;