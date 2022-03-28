const express = require("express");
const app = express();
const config = require("config");
const mongoose = require("mongoose");
const userRouter = require("./routes/users")
const authRouter = require("./routes/auth")
const postRouter = require("./routes/post")

mongoose.connect(`mongodb://${config.get("path")}`)
    .then(() => console.log("MongoDB ga ulanish amalga oshirildi:)"))
    .catch(err => console.log("MongoDB ga ulanish amalga oshmadi:("))

app.use(express.json())
app.use("/api/users", userRouter)
app.use("/api/login", authRouter)
app.use("/api/posts", postRouter)

app.listen(5000,()=> console.log("5000 chi portni eshitishni boshladim"))