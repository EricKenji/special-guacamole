const { Thought, User } = require('../models');

const thoughtController = {
    // get all thoughts
    getAllThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
                console.log(err);
                res.sendStatus(400);
            });
    },

    // get a single thought
    getThoughtById({ params }, res) {
        Thought.findOne({ _id: params.thoughtId })
            .populate({
                path: 'reactions',
                select: '-__v'
            })
            .select('-__v')
            .then(dbThoughtData => res.json(dbThoughtData))
            .catch(err => {
            console.log(err);
            res.sendStatus(400);
            });
    },

    // add a thought
    addThought({  body }, res) {
        console.log(body);
        Thought.create(body)
        .then((dbThoughtData) => {
            return User.findOneAndUpdate(
                { username: body.username },
                { $push: { thoughts: dbThoughtData._id } },
                { new: true }
            );
        })
        .then(dbUserData => {
            if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this id!' });
              return;
            }
            res.json(dbUserData);
          })
          .catch(err => res.json(err));
    },

    // edit a Thought
    updateThought({ params, body }, res) {
        Thought.findOneAndUpdate(
            { _id: params.thoughtId }, 
            body, 
            { new: true })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
    },

    // delete a Thought
    removeThought({ params }, res) {
        Thought.findOneAndDelete({ _id: params.thoughtId })
          .then(deletedThought => {
            if (!deletedThought) {
             res.status(404).json({ message: 'No thought with this id!' });
             return;
            }
            return User.findOneAndUpdate(
              { thoughts: params.thoughtId },
              { $pull: { thoughts: params.thoughtId } },
              { new: true }
            );
          })
          .then(dbUserData => {
              if (!dbUserData) {
                  res.status(404).json({ message: 'No User found with that id! '});
                  return;
              }
              res.json(dbUserData);
          })
          .catch(err => res.json(err));
      },

      // create a Reaction
      addReaction({ params, body }, res) {
          Thought.findOneAndUpdate(
              { _id: params.thoughtId },
              { $push: { reactions: body} },
              { new: true }
          )
          .then(dbThoughtData => {
            if (!dbThoughtData) {
              res.status(404).json({ message: 'No thought found with this id!' });
              return;
            }
            res.json(dbThoughtData);
          })
          .catch(err => res.json(err));
      },

      // delete a Reaction
      removeReaction({ params }, res) {
          Thought.findOneAndUpdate(
            { _id: params.thoughtId },
            { $pull: { reactions: { _id: params.reactionId }}},
            { new: true }
          )
          .then((dbThoughtData) => res.json(dbThoughtData))
          .catch((err) => res.json(err));
      }


};

module.exports = thoughtController;