const Joi = require("joi");

module.exports = function (user){
    const schema = Joi.object({
        "email": Joi.string().email().required(),
        "password": Joi.string().min(8).required()
    })

    return schema.validate(user)
}