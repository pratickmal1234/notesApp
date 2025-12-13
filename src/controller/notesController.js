import notesSchema from "../model/notesSchema.js"
import multer from "multer"


export const creatNote = async (req, res) => {
    try {

        const { title, content } = req.body

        const duplicate = await notesSchema.aggregate([
            {
                $match: {
                    title: { $regex: `^${title}$`, $options: "i" } // case-insensitive exact match
                }
            }
        ]);

        if (duplicate.length > 0) {
            return res.status(400).json({
                success: false,
                message: "Todo with same name already exists (case-insensitive)",
            });
        }

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No image uploaded",
            })
        }

        const allowedTypes = ["image/jpeg", "image/png", "image/svg"]
        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.status(400).json({
                success: false,
                message: "Invalid file type",
            })
        }

        const imageUrl = `http://localhost:8002/upload/${req.file.filename}`


        const note = await notesSchema.create({ title, content, photo: imageUrl, userId: req.userId })
        return res.status(201).json({
            success: true,
            message: "notes created successfuly",
            note
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }

}

export const getAll = async (req, res) => {
    try {
        const notes = await notesSchema.find({ userId: req.userId })
        if (!notes) {
            return res.status(400).json({
                success: false,
                message: "notes not founds"
            })
        }

        return res.status(200).json({
            success: true,
            message: "notes found successfuly",
            notes
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}


export const Delnotes = async (req, res) => {
    try {
        const { id } = req.params
        const item = await notesSchema.findOneAndDelete({
            userId: req.userId,
            _id: id
        })
        if (!item) {
            return res.status(400).json({
                success: false,
                message: "not deleted notes"
            })
        }

        return res.status(200).json({
            success: true,
            message: "deleted successfuly"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

