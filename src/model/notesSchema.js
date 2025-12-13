import mongoose from "mongoose";
import { string } from "yup";

const notesSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    }, content: {
        type: String,
        required: true
    }, photo: {
        type: String,
        required:true
    }, userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userSchema",
        required: true
    },
})

export default mongoose.model("notes", notesSchema)