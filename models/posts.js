const mongoose = require("mongoose");
const Joi = require("joi");

const postSchema = new mongoose.Schema({
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
        type: Schema.ObjectId,
        required: true
    },
    "created_at": {
        type: Date,
        default: new Date.now()
    },
});

const Post = new mongoose.model("Plan", postSchema);

function validatePost(post){
    const schema = Joi.object({
        "title": Joi.string().min(3).max(250).required(),
        "body": Joi.string().min(3).required(),
        "tags": Joi.array().required(),
        "user_id": Joi.string().required(),
    })

    return schema.validate(post)
}