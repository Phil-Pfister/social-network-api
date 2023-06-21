const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

userSchema.virtual('friendCount')
.get(function () {
    return this.friends.length;
})
.set(function (v) {
    
    this.set({v});
});

const User = model('user', userSchema);

module.exports = User;