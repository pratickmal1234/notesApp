import yup from "yup";

export const notesValidateSchema = yup.object({
    title: yup
        .string()
        .trim()
        .min(3, "Title must be atleast 3 characters")
        .max(10, "Title must be atmost 10 characters")
        .required(),
         content: yup
        .string()
        .trim()
        .min(30, "Title must be atleast 30 characters")
        .max(100, "Title must be atmost 100 characters")
        .required(),

});

export const validateNote = (schema) => async (req, res, next) => {
    try {
        await schema.validate(req.body);
        next();
    } catch (err) {
        return res.status(400).json({ errors: err.errors });
    }
};