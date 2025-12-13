import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import dotenv from "dotenv/config"
import userSchema from "../model/userSchema.js"
import scissonSchema from "../model/scissonSchema.js"
import { sendMail } from "../mailSend/sendEmail.js"



export const Register = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existing = await userSchema.findOne({ email })
        if (existing) {
            return res.status(400).json({
                success: false,
                message: "user already existing"
            })
        }
        const hash = await bcrypt.hash(password, 10)
        const user = await userSchema.create({ name, email, password: hash })

        const token = jwt.sign({ _id: user.id }, process.env.secretKey, {
            expiresIn: "2d"
        })

        sendMail(token, email)
        user.token = token
        await user.save()


        if (user) {
            return res.status(201).json({
                success: true,
                message: "user register successfuly",
                user
            })
        } else {
            return res.status(400).json({
                success: false,
                message: "user not register try again"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const login = async (req, res) => {
    try {
        const { email, password } = req.body
        const existing = await userSchema.findOne({ email })
        if (!existing) {
            return res.status(400).json({
                success: false,
                message: "user not existing"
            })
        }

        const comparePassword = await bcrypt.compare(password,existing.password)
        if(!comparePassword){
             return res.status(400).json({
                success: false,
                message: "password not match"
            })
        }else if(comparePassword && existing.varify===true){

                await scissonSchema.create({ userId: existing._id });

            const accessToken = jwt.sign(
                    { id: existing._id },
                    process.env.secretKey,
                    {
                        expiresIn: "7d"
                    }
                );
                const refreshToken = jwt.sign(
                    { id: existing._id },
                    process.env.secretKey,
                    { expiresIn: "30d" }
                );

                existing.isLoged=true
                await existing.save()


             return res.status(200).json({
                success: true,
                message: "user login successfuly",
                accessToken:accessToken,
                refreshToken:refreshToken
            })
        }else{
                 return res.status(400).json({
                success: false,
                message: "email verify fast"
            })
        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const Logout=async(req,res)=>{
    try {
         const existing = await scissonSchema.findOne({ userId: req.userId });
        const user = await userSchema.findById({ _id: req.userId });    
        if (existing) {
            await scissonSchema.findOneAndDelete({ userId: req.userId });
            user.isLoged = false;
            await user.save()
            return res.status(200).json({
                success: true,
                message: "Session successfully ended",
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User had no session",
            });
        }
    } catch (error) {
         return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}