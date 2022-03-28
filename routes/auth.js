const express = require("express");
const router = express.Router();
const validate = require("../models/auth")
const { User } = require("../models/users")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const _ = require("lodash")
const config = require("config")

router.post("/", async (req,res) => {
    const { error } = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }

    const validUser = await User.findOne({"email": req.body.email})
    if(!validUser){
        return res.status(400).send("Email yoki password noto'g'ri kiritildi")
    }

    const validPassword = await bcrypt.compare(req.body.password,validUser.password)
    if(!validPassword){
        return res.status(400).send("Email yoki password noto'g'ri kiritildi")
    }

    const token = jwt.sign(_.pick(validUser,["_id"]),config.get("signForJwt"))
    res.status(201).send({token,user: _.pick(validUser,["first_name","last_name","email","_id"])})
})

module.exports = router;