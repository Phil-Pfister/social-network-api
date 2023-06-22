const { Schema, Types, model } = require('mongoose');

const reactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280,
    },
    username: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            if (date) return date.toLocaleDateString();
        },
    },
},
{
    toJSON: {
        getters: true
    },
    id: false,
});

const thoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        min_length: 1,
        max_length: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (date) => {
            const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" };
            if (date) return date.toLocaleString("en-US", options);
        },
    },
    
    userName: {type: String, required: true},
    reactions: [reactionSchema],
    
},
{
    
    toJSON: {
        getters: true,
    },
    id: false,
    
});

const Thought = model('thought', thoughtSchema);

module.exports = Thought;