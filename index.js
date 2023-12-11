const express = require("express")
const cors = require("cors")
const { connection } = require("./config/db")
const { userRoute } = require("./routes/user.route")
const { postRoute } = require("./routes/post.route")
const app = express()

app.use(express.json())
app.use(cors())

app.use("/users", userRoute)
app.use("/posts", postRoute)

app.listen(3030, async()=>{
    try{
        await connection;
        console.log("Connected To database")
        console.log("Server is Running on port 3030")
    }catch(err){
        console.log(err)
    }
})