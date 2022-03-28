const jwt = require("jsonwebtoken");
const config = require("config");

function auth(req,res,next){
    const token = req.header("x-auth-token");
    if(!token){
        return res.status(401).send("Token mavjud emas")
    }
    try{
        jwt.verify(token, config.get("signForJwt"))
        next()
    }
    catch(err){
        res.status(400).send("Yaroqsiz token")
    }
}

module.exports = auth;