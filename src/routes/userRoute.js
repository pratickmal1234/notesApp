import express from "express"
import { login, Logout, Register } from "../controller/userController.js"
import { verifyToken } from "../middleware/verifyToken.js"
import { hasToken } from "../middleware/hasToken.js"
import { userValidateSchema, validateUser } from "../validation/userValidation.js"

const userRout=express.Router()

userRout.post("/register",validateUser(userValidateSchema),Register)
userRout.post("/login",login)
userRout.get("/verify",verifyToken)
userRout.delete("/delete",hasToken,Logout)


export default userRout