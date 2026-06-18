import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import api from "../../Api/api";

/* =========================
   ZOD SCHEMA
========================= */
const orderSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email").optional().or(z.literal("")),
    phone: z.string().min(10, "Phone is required"),
    address: z.string().min(5, "Address is required"),
    city: z.string().min(2, "City is required"),
    governorate: z.string().min(2, "Governorate is required"),
    orderNote: z.string().optional(),
});

export const OrderUser = () => {
    const [cart, setCart] = useState([]);
    const [loadingCart, setLoadingCart] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const navigate = useNavigate();
    /* =========================
       FORM
    ========================= */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(orderSchema),
    });

    /* =========================
       GET CART
    ========================= */
    const getCart = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("accessToken"));
            const res = await api.get("https://e-commerce-nodejs-blush.vercel.app/cart", {
                headers: {
                    authorization: token,
                },
            });
            setCart(res.data.data || []);
        } catch (error) {
            console.log(error);
        }
        setLoadingCart(true);

    };

    useEffect(() => {
        getCart();
    }, []);
    /* =========================
       TOTAL PRICE
    ========================= */
    const totalPrice = useMemo(() => {
        return cart?.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2);
    }, [cart]);
    /* =========================
       SUBMIT ORDER
    ========================= */
    const onSubmit = async (data) => {
        try {
            setSubmitting(true);

            const token = JSON.parse(localStorage.getItem("accessToken"));
            await api.post("https://e-commerce-nodejs-blush.vercel.app/orders", data, {
                headers: {
                    authorization: token,
                },
            });

            const result = Swal.fire({
                icon: "success",
                title: "Order Placed",
                text: "Your order has been placed successfully!",
                confirmButtonText: "OK",
                background: document.documentElement.classList.contains("dark")
                    ? "#1e293b"
                    : "#ffffff",
                color: document.documentElement.classList.contains("dark")
                    ? "#ffffff"
                    : "#000000",
            });

            // Redirect to home page after successful order placement
            if ((await result).isConfirmed) navigate("/");

            // clear cart after order placement by make an call to server to clear cart
            setCart([]);
            const res = await api.delete(
                `https://e-commerce-nodejs-blush.vercel.app/cart`,
                {
                    headers: {
                        authorization: token,
                    },
                }
            );
            // to make header know that cart is updated and update the counter in header
            window.dispatchEvent(new Event("cartUpdated"));
        } catch (err) {
            console.log(err);
        }

    };

    /* =========================
       UI
    ========================= */
    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-950  via-zinc-900 to-black  dark:bg-[#0f172a] text-white px-6 py-10">

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

                {/* ================= CART ================= */}
                <div>
                    <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

                    {!loadingCart ? (
                        <div className=" w-full  flex justify-center items-center">
                            <div className="loader"></div>
                        </div>
                    ) : !cart ? (
                        <div className="rounded-2xl border border-white/10 p-10 text-center text-gray-400">
                            Your cart is empty 🛒
                        </div>
                    ) : (
                        <>
                            <div className="space-y-4">
                                {cart && cart.map((item) => (
                                    <div
                                        key={item.product._id}
                                        className="
                                    flex items-center gap-4 p-4 rounded-2xl
                                     bg-gray-300  border border-gray-200 border-white/10  p-6
                                    text-gray-900 dark:bg-[#232a45] dark:text-white
                                    shadow-sm hover:shadow-md
                                    hover:bg-gray-50 dark:hover:bg-zinc-800/60
                                    transition-all duration-300
                                    "
                                    >
                                        {/* IMAGE */}
                                        <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-white dark:bg-blue-gray-900 border border-gray-200 dark:border-blue-gray-800 flex items-center justify-center">
                                            <img
                                                src={item.product?.images[0]}
                                                alt={item.product?.title}
                                                className="w-full h-full object-cover animate-bounce"
                                            />
                                        </div>

                                        {/* CONTENT */}
                                        <div className="flex-1">

                                            {/* TITLE */}
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {item.product.title}
                                            </h3>

                                            {/* QTY */}
                                            <p className="text-sm text-gray-700 dark:text-gray-400 mt-1">
                                                Quantity:{" "}
                                                <span className="font-medium text-gray-900 dark:text-gray-200">
                                                    {item.quantity}
                                                </span>
                                            </p>

                                            {/* PRICE */}
                                            <p className="text-sm text-gray-700 dark:text-gray-400">
                                                Price:{" "}
                                                <span className="font-medium text-gray-900 dark:text-gray-200">
                                                    {item.product.price}$
                                                </span>
                                            </p>

                                            {/* TOTAL */}
                                            <p className="text-sm text-gray-700 dark:text-gray-400">
                                                Total Price For This Item:{" "}
                                                <span className="font-medium text-gray-900 dark:text-gray-200">
                                                    {item.totalPrice?.toFixed(2)}$
                                                </span>
                                            </p>

                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* TOTAL */}
                            <div className="mt-6 rounded-xl border border-gray-200 bg-white dark:border-white/10 dark:bg-white/5 p-4 text-center shadow-sm hover:shadow-md transition-all duration-300">
                                <p className="font-bold text-lg text-gray-900 dark:text-white">
                                    Total Price For All Items:{" "}
                                    <span className="text-gray-700 dark:text-gray-400">
                                        {totalPrice}$
                                    </span>
                                </p>
                            </div>
                        </>
                    )}
                </div>

                {/* ================= FORM ================= */}
                <div className="rounded-2xl border border-gray-200 bg-gray-200
                    dark:border-white/10 dark:bg-white/5
                    p-6 backdrop-blur-xl
                    shadow-sm hover:shadow-md transition-all duration-300">
                    <h2 className="text-2xl font-bold mb-2 text-gray-800 dark:text-white">
                        Shipping Details
                    </h2>
                    <span className="text-sm text-gray-600 dark:text-gray-400 mb-4 block">
                        Feel free to update your shipping information at any time.
                    </span>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        <input
                            {...register("name")}
                            placeholder="Full Name"
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-500/20"
                        />
                        <p className="text-red-500 text-xs">{errors.name?.message}</p>

                        <input
                            {...register("email")}
                            placeholder="Email (optional)"
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-500/20"
                        />

                        <input
                            {...register("phone")}
                            placeholder="Phone"
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-500/20"
                        />
                        <p className="text-red-500 text-xs">{errors.phone?.message}</p>

                        <input
                            {...register("address")}
                            placeholder="Address"
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-500/20"
                        />
                        <p className="text-red-500 text-xs">{errors.address?.message}</p>

                        <input
                            {...register("city")}
                            placeholder="City"
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-500/20"
                        />

                        <input
                            {...register("governorate")}
                            placeholder="Governorate"
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-500/20"
                        />

                        <textarea
                            {...register("orderNote")}
                            placeholder="Order Note (optional)"
                            className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-gray-900 placeholder-gray-400 shadow-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder-gray-500 dark:focus:border-emerald-400 dark:focus:ring-emerald-500/20 h-24 resize-none"
                        />

                        <button
                            disabled={submitting || cart.length === 0}
                            className="w-full rounded-xl bg-green-900 dark:bg-blue-gray-700 py-3 font-bold text-white hover:bg-emerald-700 transition-all shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {submitting ? "Placing Order..." : "Place Order"}
                        </button>

                    </form>
                </div>
            </div>


        </div>
    );
};