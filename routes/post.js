const express = require("express");
const router = express.Router();
const _ = require("lodash");
const { Post, validatePost } = require("../models/posts");

router.get("/", async (req,res) => {
    const posts = await Post.find()
    res.send(posts)
})

router.post("/", async (req,res) => {
    const { error } = validatePost(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    } 

    try{
        const post = new Post(_.pick(req.body,["title","body","user_id","tags"]))
        const savedPost = await post.save()
        res.status(201).send(savedPost)
    }
    catch(err){
        res.status(400).send("Xatolik aniqlandi, so'rovni tekshirib ko'ring")
    }
})



module.exports = router;