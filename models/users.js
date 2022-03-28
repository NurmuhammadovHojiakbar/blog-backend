const mongoose = require("mongoose")
const Joi = require("joi")

const userSchema = new mongoose.Schema({
    "first_name": {
        type: String,
        minlength: 5,
        maxlength: 25,
        required: true
    },
    "last_name": {
        type: String,
        minlength: 5,
        maxlength: 25,
        required: true
    },
    "email": {
        type: String,
        required: true,
        unique: true
    },
    "password": {
        type: String,
        minlength: 8,
        required: true
    }     
});

const User = new mongoose.model("User", userSchema);

function validateUser(user){
    const schema = Joi.object({
        "first_name": Joi.string().min(5).max(25).required(),
        "last_name": Joi.string().min(5).max(25).required(),
        "email": Joi.string().email().required(),
        "password": Joi.string().min(8).required(),
    })

    return schema.validate(user)
};

module.exports = {
    User,
    validateUser,
};