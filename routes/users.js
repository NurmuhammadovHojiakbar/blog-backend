const express = require("express");
const router = express.Router();
const _ = require("lodash")
const jwt = require("jsonwebtoken")
const { User, validateUser } = require("../models/users");
const config = require("config");
const bcrypt = require("bcrypt")

router.get("/", async (req,res) => {
    const allUsers = await User.find().select("-password -__v")
    res.send(allUsers)
})

router.post("/", async (req,res) => {
    const { error } = validateUser(req.body)

    if(error){
        return res.status(400).send(error.details[0].message)
    }

    try{
        const user = new User(_.pick(req.body,["first_name","last_name","email","password"]))

        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password,salt)

        user.password = hashedPassword
        const savedUser = await user.save()

        const token = jwt.sign(_.pick(savedUser,["_id"]),config.get("signForJwt"))
        res.status(201).send({token,user: _.pick(savedUser,["first_name","last_name","email","_id"])})
    }
    catch(err){
        res.status(400).send("Bunday email bazada allaqachon mavjud:(")
    }
})

module.exports = router;