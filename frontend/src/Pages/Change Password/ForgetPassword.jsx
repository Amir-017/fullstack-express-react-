import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation } from "react-router-dom";
import api from "../../Api/api";

export const ForgetPassword = () => {
    const [email, setEmail] = useState("");
    const [checkButton, setCheckButton] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setCheckButton(true);

            const res = await api.post("https://e-commerce-nodejs-blush.vercel.app/users/forgotPassword", {
                email: email,
            }
            );

            await Swal.fire({
                icon: "success",
                title: "Reset Link Sent",
                text: res.data.message,
                confirmButtonText: "OK",

                background: document.documentElement.classList.contains("dark") ? "#1e293b" : "#ffffff",
                color: document.documentElement.classList.contains("dark") ? "#ffffff" : "#111827",
                confirmButtonColor: "#2563eb",
            });
            setCheckButton(false);
        } catch (err) {
            await Swal.fire({
                icon: "error",
                title: "Error",
                text: err.response?.data || "Error",
                confirmButtonText: "OK",

                background: document.documentElement.classList.contains("dark") ? "#1e293b" : "#ffffff",
                color: document.documentElement.classList.contains("dark") ? "#ffffff" : "#111827",
                confirmButtonColor: "#dc2626",
            });
            setCheckButton(false);
        }

    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#0f172a] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Forgot Password
                    </h1>

                    <p className="mt-3 text-gray-500 dark:text-gray-400">
                        Enter your email address and we'll send you a link in a few minutes in your inbox (gmail) to reset your password.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Email Address
                        </label>

                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f172a] px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={checkButton}
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg hover:shadow-green-500/20 dark:bg-blue-gray-700 hover:dark:bg-blue-gray-600"
                    >
                        {checkButton ? "Sending..." : "Send Reset Link"}
                    </button>

                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Remember your password?
                        <span className="ml-1 text-green-600 dark:text-gray-600 cursor-pointer hover:underline">
                            Sign In
                        </span>
                    </p>
                </div>

            </div>
        </div>
    );
}