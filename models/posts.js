const {Schema, model} = require("mongoose");
const Joi = require("joi");

const postSchema = new Schema({
    "title": {
        type: String,
        minlength: 3,
        maxlength: 250,
        required: true,
        trim: true
    },
    "body": {
        type: String,
        minlength: 3,
        required: true,
        trim: true
    },
    "tags": {
        type: Array,
        required: true
    },
    "user_id": {
        type: Schema.Types.ObjectId,
        required: true
    },
    "created_at": {
        type: Date,
        default: Date.now()
    },
});

const Post = model("Post", postSchema);

function validatePost(post){
    const schema = Joi.object({
        "title": Joi.string().min(3).max(250).required(),
        "body": Joi.string().min(3).required(),
        "tags": Joi.array().required(),
        "user_id": Joi.string().required(),
    })

    return schema.validate(post)
}

module.exports = {
    validatePost,
    Post
}