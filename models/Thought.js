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
            if (date) return date.toISOString().splite("T") [0];
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
            if (date) return date.toISOString().splite("T") [0];
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

modules.exports = Thought;