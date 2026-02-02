import mongoose from "mongoose";
// import { Schema, string } from "yup";
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }, email: {
        type: String,
        required: true
    }, password: {
        type: String,
        required: true
    }, isLoged: {
        type: Boolean,
        default: false
    }, varify: {
        type: Boolean,
        default: false
    }, token: {
        type: String,
        default: false
    }
}, { timestram: true })

export default mongoose.model("notesUser", userSchema)