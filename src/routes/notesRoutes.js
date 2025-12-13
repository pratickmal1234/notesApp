import express from "express"
import { creatNote, Delnotes, getAll } from "../controller/notesController.js"
import {hasToken} from "../middleware/hasToken.js"
import { upload } from "../controller/multerController.js"
import { notesValidateSchema, validateNote } from "../validation/notesValidation.js"

const notesRoute=express.Router()

notesRoute.post("/createNote",hasToken, upload.single("photo"),validateNote(notesValidateSchema),creatNote)
notesRoute.get("/getnotes",hasToken,getAll)
notesRoute.delete("/delete/:id",hasToken ,Delnotes)



export default notesRoute