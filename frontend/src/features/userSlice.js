import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: [],
    notes: [],
    loading: false,
    error: null,
}

// register user 
export const register = createAsyncThunk("user/register", async (data, ThunkApi) => {
    try {
        const res = await axios.post(`http://localhost:8006/user/register`, data)
        // console.log(res.data.data);
        return res.data.data
    } catch (error) {
        console.log(error);
        return ThunkApi.rejectWithValue(
            error.response?.data || { message: "Something went wrong" }
        );

    }
})

// login user 
export const login = createAsyncThunk("user/login", async ({ email, password }, ThunkApi) => {

    try {
        const res = await axios.post(`http://localhost:8006/user/login`, { email, password })
        return res.data.data
    } catch (error) {
        console.log(error);
        return ThunkApi.rejectWithValue(
            error.response?.data || { message: "Something went wrong" }
        );

    }
})

// add notes 
export const createNote = createAsyncThunk(
    "note/add",
    async ({ title, content, image }, ThunkApi) => {
        try {
            const formData = new FormData();
            formData.append("title", title);
            formData.append("content", content);
            formData.append("photo", image);


            const token = localStorage.getItem("token");
            // console.log(token);

            const res = await axios.post(
                "http://localhost:8006/notes/createNote",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            return res.data;
        } catch (error) {
            return ThunkApi.rejectWithValue(
                error.response?.data || { message: "Something went wrong" }
            );
        }
    }
);



// getall notes 
export const getAllNotes = createAsyncThunk(
    "note/getall",
    async (_, ThunkApi) => {
        try {
            const token = localStorage.getItem("token");
            // console.log(token);

            const res = await axios.get(
                "http://localhost:8006/notes/getnotes",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    },
                }
            );

            return res.data;
        } catch (error) {
            return ThunkApi.rejectWithValue(
                error.response?.data || { message: "Something went wrong" }
            );
        }
    }
);


// delete note 
export const deleteNote = createAsyncThunk("note/delete", async (id, ThunkApi) => {
    try {
        const token = localStorage.getItem("token");

        await axios.delete(`http://localhost:8006/notes/delete/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        return id
    } catch (error) {
        console.log(error);
        return ThunkApi.rejectWithValue(error.res.data)

    }
})


// update note 
export const updateNote = createAsyncThunk("note/update", async ({id,data}, ThunkApi) => {
    try {
        const token = localStorage.getItem("token");

        await axios.put(`http://localhost:8006/notes/update/${id}`,data ,{
            headers: {
                Authorization: `Bearer ${token}`
            },
        })
        return res.data
    } catch (error) {
        console.log(error);
        return ThunkApi.rejectWithValue(error.res.data)

    }
})




const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {},

    extraReducers: (builder) => {
        builder
            // register 
            .addCase(register.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload

            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false
                state.error = action.payload
                state.error = action.payload?.message || "Something went wrong";
            })
            // login 
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload



                // if (action.payload.token) {
                //     localStorage.setItem("token", action.payload.token);
                // }
            })
            // create note 
            .addCase(createNote.fulfilled, (state, action) => {
                state.loading = false;
                state.notes.push(action.payload.note);
                state.successMessage = action.payload.message;
                state.error = null;
            })

            // getall note 
            .addCase(getAllNotes.fulfilled, (state, action) => {
                state.loading = false;
                state.notes = action.payload.notes
                state.error = null;
            })
            //delete
            .addCase(deleteNote.fulfilled, (state, action) => {
                state.notes = state.notes.filter((item) => item._id !== action.payload)
            })
             //update
            .addCase(updateNote.fulfilled, (state, action) => {
                  const index = state.notes.findIndex((item) => item._id === action.payload._id)
                if (index !== -1) state.notes[index] = action.payload
            })

    }
})
export default userSlice.reducer