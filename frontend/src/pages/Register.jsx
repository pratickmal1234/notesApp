import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../features/userSlice'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { loading, error,user } = useSelector((state) => state.user);

    const handleRegister = async (e) => {
        e.preventDefault();

        const result = await dispatch(
            register({ name, email, password })
        );

        if (register.fulfilled.match(result)) {
            navigate("/login"); // ✅ only success
        }
    };



    // const handleRegister = async (e) => {
    //     e.preventDefault();

    //     // try {
    //        dispatch(register({name,email,password}))
    //       navigate("/login")

    // //     } catch (error) {
    // //         console.log(error);
    // // //   alert(error.response?.data?.message || error.message);

    // //     }
    // }
    return (
        <><div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">
                Create an Account
            </h2>
            <form onSubmit={handleRegister}>
                <div className="mb-4">
                    <label className="block text-gray-700">Full Name</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => { setName(e.target.value) }}
                        placeholder="Your name"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required=""
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Email Address</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => { setEmail(e.target.value) }}
                        placeholder="Enter email address"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required=""
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => { setPassword(e.target.value) }}
                        placeholder="Enter password"
                        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                        required=""
                    />
                </div>
                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md transition duration-300 disabled:opacity-50"
                >
                    {loading ? "Registering..." : "Sign Up"}
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
            <p className="text-sm text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 hover:underline">
                    Login
                </Link>
            </p>
        </div>

        </>
    )
}

export default Register