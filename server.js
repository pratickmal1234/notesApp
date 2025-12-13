import express from "express"
import dotenv from "dotenv/config"
import { dbConnected } from "./src/config/dbConnected.js"
import userRout from "./src/routes/userRoute.js"
import notesRoute from "./src/routes/notesRoutes.js"

const app=express()
const port=process.env.port || 8000

dbConnected()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use("/upload", express.static("upload"))
app.use("/user",userRout)
app.use("/notes",notesRoute)
app.listen(port,()=>{
    console.log(`the server is running on ${port}`);
    
})
