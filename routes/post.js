const express = require("express");
const router = express.Router();
const { Post, validatePost } = require("../models/posts")

router.get("/", async (req,res) => {
    const posts = await Post.find()
    res.send(posts)
})



module.exports = router;