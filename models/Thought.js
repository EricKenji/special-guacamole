const { Schema, model, Types } = require('mongoose');

// schema for Reactions
const ReactionSchema = new Schema(
    {
        // ID for Reaction
        reactionId: {
            type: Schema.Types.ObjectId,
            default: () => new Types.ObjectId()
        },
        // text of Reaction
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280 
        },
        // Username that created REaction
        username: {
            type: String,
            required: true
        },
        // time Reaction was created
        createdAt: {
            type: Date,
            default: Date.now
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// Schema for Thoughts
const ThoughtSchema = new Schema (
    {
        // Text body of Thought
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        // time Thought was created
        createdAt: {
            type: Date,
            default: Date.now
        },
        // USer name that created Thought
        username: {
            type: String,
            required: true
        },
        // Reactions attached to Thought
        reactions: [ReactionSchema]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id: false
    }
);

// creates virtual for number of Reactions to Thought
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;