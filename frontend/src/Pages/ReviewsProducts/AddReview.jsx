import axios from "axios";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import api from "../../Api/api";

export default function AddReview() {
    //////////////////// States and Hooks ///////////////////////
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("userName")) || null
    );
    const { id } = useParams();
    const navigate = useNavigate();

    /////////////////////// React Hook Form ///////////////////////
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm({
        defaultValues: {
            rating: "",
            title: "",
            review: "",
        },
    });

    ////////////////////// Function that submit review and check if admin wants to add review cause it's not allowed for admin to add review ///////////////////////
    const submitReview = async (values) => {
        // check if admin wants to add review cause it's not allowed for admin to add review
        if (currentUser && currentUser === "amir whdan") {
            const result = Swal.fire({
                icon: "error",
                title: "Access Denied",
                text: "Admins are not allowed to add reviews.",
                confirmButtonText: "OK",
                background: document.documentElement.classList.contains("dark")
                    ? "#1e293b"
                    : "#ffffff",
                color: document.documentElement.classList.contains("dark")
                    ? "#ffffff"
                    : "#000000",
            });
            if ((await result).isConfirmed) {
                navigate(-1); // Navigate back to the previous page
                return
            }

        }
        //
        const token = JSON.parse(localStorage.getItem("accessToken"));
        try {
            await api.post(
                `https://e-commerce-nodejs-blush.vercel.app/reviewProducts/${id}`,
                values, {
                headers: {
                    authorization: token
                }
            }
            );
            reset();
            await Swal.fire({
                icon: "success",
                title: "Review Added Successfully",
                text: "Thank you for sharing your feedback ❤️",
                confirmButtonText: "OK",
                background: document.documentElement.classList.contains("dark")
                    ? "#1e293b"
                    : "#ffffff",
                color: document.documentElement.classList.contains("dark")
                    ? "#ffffff"
                    : "#000000",
            });
            navigate(-1);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Something went wrong",
                text:
                    error?.response?.data?.message ||
                    "Failed to submit review",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-[#0f172a] px-4 py-10">
            <div className="w-full max-w-2xl bg-white dark:bg-[#1e293b] rounded-2xl shadow-xl p-8">

                <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
                    Share Your Experience
                </h1>

                <p className="text-center text-gray-500 dark:text-gray-300 mt-3 mb-8">
                    Your opinion helps other customers make better decisions.
                </p>

                <form
                    onSubmit={handleSubmit(submitReview)}
                    className="space-y-6"
                >
                    {/* Rating */}

                    <div>
                        <label className="block mb-2 font-semibold text-gray-700 dark:text-white">
                            Rating (1 - 5)
                        </label>

                        <input
                            type="number"
                            min={1}
                            max={5}
                            placeholder="Enter Rating"
                            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#273449] text-gray-900 dark:text-white p-3 outline-none focus:ring-2 focus:ring-green-600"
                            {...register("rating", {
                                required: "Rating is required",
                                min: {
                                    value: 1,
                                    message: "Minimum rating is 1",
                                },
                                max: {
                                    value: 5,
                                    message: "Maximum rating is 5",
                                },
                            })}
                        />
                        {errors.rating && (
                            <p className="text-red-500 mt-2 text-sm">
                                {errors.rating.message}
                            </p>
                        )}
                    </div>

                    {/* Title */}
                    <div>
                        <label className="block mb-2 font-semibold text-gray-700 dark:text-white">
                            Title
                        </label>

                        <input
                            type="text"
                            placeholder="Review Title"
                            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#273449] text-gray-900 dark:text-white p-3 outline-none focus:ring-2 focus:ring-green-600"
                            {...register("title", {
                                required: "Title is required",
                                minLength: {
                                    value: 3,
                                    message: "Minimum 3 characters",
                                },
                                maxLength: {
                                    value: 50,
                                    message: "Maximum 50 characters",
                                },
                            })}
                        />
                        {errors.title && (
                            <p className="text-red-500 mt-2 text-sm">
                                {errors.title.message}
                            </p>
                        )}
                    </div>

                    {/* Review */}

                    <div>
                        <label className="block mb-2 font-semibold text-gray-700 dark:text-white">
                            Review
                        </label>

                        <textarea
                            rows={5}
                            placeholder="Write your review..."
                            className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-[#273449] text-gray-900 dark:text-white p-3 outline-none resize-none focus:ring-2 focus:ring-green-600"
                            {...register("review", {
                                required: "Review is required",
                                minLength: {
                                    value: 10,
                                    message: "Minimum 10 characters",
                                },
                            })}
                        />

                        {errors.review && (
                            <p className="text-red-500 mt-2 text-sm">
                                {errors.review.message}
                            </p>
                        )}
                    </div>

                    {/* Button */}

                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className="w-full bg-green-700 hover:bg-green-800 dark:bg-blue-gray-700 dark:hover:bg-blue-gray-600 text-white font-bold py-3 rounded-xl transition duration-300 disabled:opacity-60"
                    >
                        {!isSubmitting || currentUser == 'amir whdan' ? "Submit Review" : "Submitting..."}
                    </button>
                </form>
            </div>
        </div>
    );
}