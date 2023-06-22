const User = require('../models/User');
const Thought = require('../models/Thought')

module.exports = {
    async getUsers(req, res) {
        try {
            const users = await User.find();
            res.json(users);
        } catch (err) {
            res.status(500).json(err)
        }
    },
    async getOneUser(req, res) {
        try {
            const user = await User.findOne({  _id: req.params.id })
            .select('-_v');

            if (!user) {
                return res.status(400).json({ message: 'No user with this ID'});
            }

            res.json(user);

        } catch (err) {
            res.status(500).json(err);
        }
    },
    async createUser(req, res) {
        try {
            const userData = await User.create(req.body);
            res.json(userData);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async updateUser(req, res) {
        try {
            const userData = await User.findOneAndUpdate({ _id: req.params.id}, { $set: req.body }, { runValidators: true, new: true });

            if(!userData) {
                return res.status(404).json({ message: 'No user by this ID' })
            }
            res.json({ message: 'User updated successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async addFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate({ _id: req.params.userId }, { $push: {friends: [req.params.friendId]}});
            if (!userData) {
                res.status(404).json({ message: 'No user with this id!' });
            }
            res.json({ message: 'Friend added successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteUser(req, res) {
        try {
            const user = await User.findOneAndDelete( { _id: req.params.id });
            const thoughts = await Thought.deleteMany( { _id: { $in: user.thoughts } });

        res.json({ message: 'User and associated thoughts deleted' })
        } catch (err) {
            res.status(500).json(err);
        }
    },
    async removeFriend(req, res) {
        try {
            const userData = await User.findOneAndUpdate({ _id: req.params.userId }, { $pull: {friends: req.params.friendId}});
            if (!userData) {
                res.status(404).json({ message: 'No user with this id!' });
            }
            res.json({ message: 'Friend removed successfully' });
        } catch (err) {
            res.status(500).json(err);
        }
    }, 
};