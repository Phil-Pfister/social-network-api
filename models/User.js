const { Schema, model } = require('mongoose');
// user schema
const userSchema = new Schema({
    username: { type: String, required: true, trim: true, unique: true },
    email: { type: String, required: true, unique: true, validate: {
        // validator function to check email entry, if not valid entry returns message that email is not valid
        validator: function(v) {
            return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.test(v);
        },
        message: props => `${props.value} is not a valid email`
    } },
    // arrays for thoughts and friends that reference existing schemas
    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thought' }],
    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});
// virtual to display the number of friends in the friends array
userSchema.virtual('friendCount')
.get(function () {
    return this.friends.length;
})
.set(function (v) {
    
    this.set({v});
});


const User = model('user', userSchema);

module.exports = User;