const Thought = require('../models/Thought');
const User = require('../models/User');
module.exports = {
    async getThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts);
        } catch (err) {
            res.status(500).json(err)
        }
    },

    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.thoughtId })

            if(!thought) {
                return res.status(404).json({ message: 'No thought with that ID' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);
            const user = await User.findOneAndUpdate(
                { username: req.body.userName },
                { $addToSet: { thoughts: thought._id } },
                { new: true}
            );

            if (!user) {
                return res.status(404).json({ message: 'Thought created, but found no user with that username' });
            }
            res.json(thought);

        } catch (err) {
            res.status(500).json(err);
        }

       
    },

    async updateThought(req, res) {
        try {
            const updatedThought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true}
            );

            if (!updatedThought) {
                return res.status(404).json({ message: 'No thought with that id!' });
            }
            res.json(updatedThought)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.thoughtId })
            if(!thought) {
                res.status(404).json({ message: 'No thought with that id!' });
            }

            res.json({ message: 'Thought deleted' })
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async createReact(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                {_id: req.params.thoughtId},
                { $addToSet: { reactions: req.body } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id' });
            }
            res.json(thought)
        } catch (err) {
            res.status(500).json(err);
        }
    },

    async removeReaction(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { reactionId: req.params.reactId } } },
                { runValidators: true, new: true }
            );

            if (!thought) {
                return res.status(404).json({ message: 'No thought with this id' });
            }
            res.json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },
};
