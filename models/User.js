const { Schema, model } = require('mongoose');

// schema for User Models
const UserSchema = new Schema(
    {
        // username for User
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        // email for User
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/.+@.+\..+/, 'Please enter a valid e-mail address']
        },
        // Thoughts created by User
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        // Friends User has
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

//creates virtual for the amount of friends a User has
UserSchema.virtual('friendCount').get(function() {
    return this.friends.length
});

const User = model('User', UserSchema);

module.exports = User;