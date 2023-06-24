const { Schema, Types, model } = require('mongoose');
// reaction schema, called in thoughts schema
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
        // getter to format date
        get: (date) => {
            const options = { weekday: "long", year: "numeric", month: "long", day: "numeric", hour: "numeric", minute: "2-digit" };
            if (date) return date.toLocaleString("en-US", options);
        },
    },
},
{
    toJSON: {
        getters: true
    },
    id: false,
});
// thought schema
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
    // reference to reaction schema - creates array of reactions
    reactions: [reactionSchema],
    
},
{
    
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false,
    
});
// virtual to create a reaction count in json response and display count 
thoughtSchema.virtual('reactionCount')
.get(function () {
    return this.reactions.length;
})
.set(function (v) {
    
    this.set({v});
});


const Thought = model('thought', thoughtSchema);

module.exports = Thought;