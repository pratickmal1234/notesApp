import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createNote, getAllNotes } from "../features/userSlice";

const AddNotes = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [image, setImage] = useState(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { error, loading } = useSelector(
        (state) => state.user
    );

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await dispatch(
            createNote({ title, content, image })
        );

        // if (createNote.fulfilled.match(result)) {
        //     setTitle("");
        //     setContent("");
        //     setImage(null);
        //     navigate("/dashboard");
        // }
        if (createNote.fulfilled.match(result)) {
            
            dispatch(getAllNotes())
            setTimeout(() => navigate("/dashboard"), 2000);
        }


    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-6 rounded-lg shadow w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">
                    Add Note
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Note title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <textarea
                        placeholder="Note content"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows="4"
                        className="w-full border px-3 py-2 rounded outline-none focus:ring-2 focus:ring-blue-400"
                        required
                    />

                    <input
                        type="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        className="w-full"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300 disabled:opacity-50"
                    >
                        {loading ? "adding..." : "add note"}
                    </button>

                    {error && (
                        <div className="mb-4 bg-red-100 text-red-700 p-2 rounded">
                            {Array.isArray(error.errors)
                                ? error.errors.map((err, i) => (
                                    <p key={i}>• {err}</p>
                                ))
                                : error.message}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
};

export default AddNotes;
