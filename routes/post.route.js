const express = require("express")
const { postModel } = require("../models/post.model")
const { auth } = require("../middleware/auth.middleware")

const postRoute = express.Router()

postRoute.get("/", auth, async(req, res)=>{
    try{
        const posts = await postModel.find({userId:req.body.userId})
        res.status(200).send(posts)
    }catch(err){
        res.status(400).send(err)
    }
})

postRoute.post("/add", auth, async(req, res)=>{
    try{
        const post = new postModel(req.body)
        await post.save()
        res.status(200).send({"Msg":"Post Added", "Post":post})
    }catch(err){
        res.status(400).send(err)
    }
})

postRoute.patch("/update/:id", async(req, res)=>{
    const {id} = req.params
    try{
        const post = await postModel({_id:id})
        if(req.body.userId===post.userId){
            await postModel.findByIdAndUpdate({_id:id}, req.body)
            res.status(200).send({"Msg":"Data Updated"})
        }else{
            res.status(200).send({"Msg":"You are Not Authorize"})
        }
    }catch(err){
        res.status(400).send(err)
    }
})

postRoute.delete("/delete/:id", async(req, res)=>{
    const {id} = req.params
    try{
        const post = await postModel({_id:id})
        if(req.body.userId===post.userId){
            await postModel.findByIdAndDelete({_id:id})
            res.status(200).send({"Msg":"Post Data Deleted"})
        }else{
            res.status(200).send({"Msg":"You are Not Authorize"})
        }
    }catch(err){
        res.status(400).send(err)
    }
})

module.exports={postRoute}