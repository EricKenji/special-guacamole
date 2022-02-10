const { User } = require ('../models');

const userController = {
    // get all users
    getAllUsers(req, res) {
        User.find({})
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
            console.log(err);
            res.sendStatus(400);
            });
    },

    //get single user
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
            .populate({
                path: 'friends',
                select: '-__v'
            })
            .populate({
                path: 'thoughts',
                select: '-__v'
            })
            .select('-__v')
            .then(dbUserData => res.json(dbUserData))
            .catch(err => {
            console.log(err);
            res.sendStatus(400);
            });
    },

    // create a new user
    createUser({ body }, res) {
        User.create(body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    },

    //update user by id
    updateUser({ params, body }, res) {
        User.findOneAndUpdate({ _id: params.id }, body, { new:true })
            .then(dbUserData => {
                if (!dbUserData) {
                res.status(404).json({ message: 'No User found with this id!' });
                return;
                }
                res.json(dbUserData);
            })
            .catch(err => res.json(err));
    },

    // delete user
    deleteUser({ params }, res) {
        User.findOneAndDelete({ _id: params.id })
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.json(err));
    }, 

    //add friend
    addFriend({ params }, res) {
        User.findOneAndUpdate(
            { id:params.id },
            { $push: {friends: params.friendId }},
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    //delete friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate(
            { id:params.id },
            { $pull: {friends: params.friendId }},
            { new: true }
        )
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No User found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },


};

module.exports = userController;