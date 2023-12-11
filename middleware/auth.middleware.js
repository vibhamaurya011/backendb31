const express = require("express")
const jwt = require("jsonwebtoken")

const auth = (req, res, next)=>{
    const token = req.cookies.accessToken;
    try{
        jwt.verify(token, 'masai', async(err, decoded)=> {
            if(decoded){
                req.body.userId=decoded.userId
                next()
            }else{
                res.status(400).send("Unauthorize User")
            }
        });
    }catch(err){
        res.status(400).send(err)
    }
}

module.exports={auth}