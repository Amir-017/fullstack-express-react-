import { useState } from "react";
import { Link, Navigate, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import api from "../../Api/api";

export const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const [errorPassword, setErrorPassword] = useState("");
    const [checkButton, setCheckButton] = useState(false);
    const token = searchParams.get("token");
    const email = searchParams.get("email");

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setErrorPassword("Passwords do not match");
            return;
        }

        if (newPassword.length < 6) {
            setErrorPassword("Password must be at least 6 characters");
            return;
        }

        setCheckButton(true);
        try {
            const res = await api.post("https://e-commerce-nodejs-blush.vercel.app/users/resetPassword", {
                token,
                newPassword,
            }
            );
            Swal.fire({
                icon: "success",
                title: "Password Reset Successful",
                text: res.data.message,
                confirmButtonText: "Go to Login",

                background: document.documentElement.classList.contains("dark") ? "#1e293b" : "#ffffff",
                color: document.documentElement.classList.contains("dark") ? "#ffffff" : "#111827",
                confirmButtonColor: "#22c55e",
            }).then(() => {
                navigate("/login");
            });

        } catch (err) {
            Swal.fire({
                icon: "error",
                title: "Password Reset Failed",
                text: "Your reset link may have expired or is invalid. Please try again.",

                background: document.documentElement.classList.contains("dark") ? "#1e293b" : "#ffffff",
                color: document.documentElement.classList.contains("dark") ? "#ffffff" : "#111827",
                confirmButtonColor: "#dc2626",
            })

            navigate("/login");
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-[#0f172a] flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white dark:bg-[#1e293b] rounded-3xl shadow-2xl p-8">

                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                        Reset Password
                    </h1>

                    <p className="mt-3 text-gray-500 dark:text-gray-400">
                        Create a new password for your account.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            New Password
                        </label>

                        <input
                            type="password"
                            placeholder="Enter your new password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f172a] px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>

                    <div>
                        <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                            Confirm Password
                        </label>

                        <input
                            type="password"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full rounded-xl border border-gray-300 dark:border-gray-700 bg-white dark:bg-[#0f172a] px-4 py-3 text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-blue-500 transition"
                        />
                    </div>
                    <p className="text-red-800 dark:text-red-400 font-medium">{errorPassword}</p>
                    <button
                        type="submit"
                        disabled={checkButton}
                        className="w-full bg-green-600 hover:bg-green-700 dark:bg-blue-gray-700 hover:dark:bg-blue-gray-600 text-white font-semibold py-3 rounded-xl transition duration-300 shadow-lg hover:shadow-green-500/20"
                    >
                        {checkButton ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Remember your password?
                        <Link to="/login" className="ml-1 text-green-600 dark:text-gray-700 cursor-pointer hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}