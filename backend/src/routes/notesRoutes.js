import express from "express"
import { creatNote, Delnotes, getAll, updateNote } from "../controller/notesController.js"
import {hasToken} from "../middleware/hasToken.js"
import { upload } from "../controller/multerController.js"
import { notesValidateSchema, validateNote } from "../validation/notesValidation.js"

const notesRoute=express.Router()

notesRoute.post("/createNote",hasToken, upload.single("photo"),creatNote)
notesRoute.get("/getnotes",hasToken,getAll)
notesRoute.delete("/delete/:id",hasToken ,Delnotes)
notesRoute.put("/update/:id",hasToken ,updateNote)



export default notesRoute