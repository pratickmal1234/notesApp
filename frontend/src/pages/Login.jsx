import axios from 'axios'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../features/userSlice'

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const dispatch = useDispatch()
    const { loading, error } = useSelector((state) => state.user);
    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();

        const result = await dispatch(login({ email, password }));

        if (login.fulfilled.match(result)) {
            navigate("/dashboard"); // বা যেখানে চাই
        }
    };

    return (
        <><main className="w-full h-screen flex flex-col items-center justify-center px-4">
            <div className="max-w-sm w-full text-gray-600 space-y-5">
                <div className="text-center pb-8">
                    <div className="mt-5">
                        <h3 className="text-gray-800 text-2xl font-bold sm:text-3xl">
                            Log in to your account
                        </h3>
                    </div>
                </div>
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="font-medium"> Email </label>
                        <input
                            type="email"
                            placeholder='enter your email'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            required=""
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div>
                        <label className="font-medium"> Password </label>
                        <input
                            type="password"
                            placeholder='Enter your password'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value) }}
                            required=""
                            className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-red-600 shadow-sm rounded-lg"
                        />
                    </div>
                    <div className="flex items-center justify-between text-sm">

                        <a
                            href="javascript:void(0)"
                            className="text-center text-red-600 hover:text-red-500"
                        >
                            Forgot password?
                        </a>
                    </div>
                    <button
                        disabled={loading}
                        className="w-full px-4 py-2 text-white font-medium bg-red-600
  hover:bg-red-500 rounded-lg disabled:opacity-50"
                    >
                        {loading ? "Signing in..." : "Sign in"}
                    </button>


                    {error && (
                        <div className="bg-red-100 text-red-700 p-2 rounded">
                            {Array.isArray(error.errors)
                                ? error.errors.map((err, i) => (
                                    <p key={i}>• {err}</p>
                                ))
                                : error.message}
                        </div>
                    )}
                </form>
                <button className="w-full flex items-center justify-center gap-x-3 py-2.5 border rounded-lg text-sm font-medium hover:bg-gray-50 duration-150 active:bg-gray-100">
                    {/* SVG for Google Sign In */}
                    <img
                        src="https://raw.githubusercontent.com/sidiDev/remote-assets/7cd06bf1d8859c578c2efbfda2c68bd6bedc66d8/google-icon.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    {/* Comment: Google Icon SVG here */}
                    Continue with Google
                </button>
                <p className="text-center">
                    Don't have an account?
                    <Link
                        to="/"
                        className="font-medium text-red-600 hover:text-red-500"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </main>
        </>
    )
}

export default Login