import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../Api/api";

export function AllOrders() {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const token = JSON.parse(localStorage.getItem("accessToken"));
                const res = await api.get("https://e-commerce-nodejs-blush.vercel.app/orders", {
                    headers: {
                        authorization: token,
                    },
                });

                setOrders(res.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);
    console.log(orders);
    return (
        <div className="min-h-screen px-4 py-10 bg-gray-100 dark:bg-[#0f172a]">
           {loading ? <div className="w-full h-screen flex items-center justify-center">
            <div className="loader"></div>
           </div> : <div>   <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                🛒 Admin Orders Dashboard
            </h1>

            <div className="space-y-6">

                {orders.map((order) => (
                    <div
                        key={order._id}
                        className="rounded-2xl border border-gray-200 bg-white dark:bg-[#0f172a] dark:border-blue-gray-600 p-5 shadow-sm hover:shadow-md transition"
                    >

                        {/* USER INFO */}
                        <div className="mb-4">
                            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                                {order.userInfo.name}
                            </h2>

                            <p className="text-sm text-gray-600 dark:text-white">
                                📧 {order.userInfo.email} | 📞 {order.userInfo.phone}
                            </p>

                            <p className="text-sm text-gray-600 dark:text-white">
                                📍 {order.userInfo.address}, {order.userInfo.city}, {order.userInfo.governorate}
                            </p>

                            <p className="text-xs text-gray-500 mt-1 dark:text-gray-400">
                                🕒 {new Date(order.createdAt).toLocaleString()}
                            </p>
                        </div>

                        {/* PRODUCTS */}
                        <div className="space-y-3">

                            {order.products.map((item) => (
                                <div
                                    key={item._id}
                                    className="flex items-center justify-between rounded-xl border border-gray-100 dark:border-blue-gray-600 p-3 bg-gray-50 dark:bg-blue-gray-800/40"
                                >

                                    <div className="flex items-center justify-between gap-4 w-full">

                                        {/* LEFT: PRODUCT INFO */}
                                        <div className="flex items-center gap-3">

                                            {/* IMAGE */}
                                            <img
                                                src={item.product.images?.[0]}
                                                alt="product"
                                                className="h-14 w-14 rounded-xl object-cover border border-gray-200 dark:border-blue-gray-600"
                                            />

                                            {/* TEXT */}
                                            <div>

                                                {/* TITLE */}
                                                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                                                    {item.product.title}
                                                </p>

                                                {/* PRICE + QTY */}
                                                <p className="text-xs text-gray-500 dark:text-gray-400">
                                                    ${item.product.price} × {item.quantity}
                                                </p>

                                            </div>
                                        </div>

                                        {/* RIGHT SIDE */}
                                        <div className="text-right">

                                            {/* CATEGORY */}
                                            <span className="inline-block text-[10px] px-2 py-1 rounded-full bg-gray-200 text-gray-700 dark:bg-blue-gray-600 dark:text-gray-300 mb-2">
                                                {item.product.category}
                                            </span>

                                            {/* TOTAL */}
                                            <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                                                ${(item.product.price * item.quantity).toFixed(2)}
                                            </p>

                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>
                ))}
                {/* total orders count and all revenue */}
                <div className="mt-8 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#0f172a]">

                    <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                        📊 Orders Summary
                    </h2>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

                        {/* TOTAL ORDERS */}
                        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-500/10 p-4 text-center border border-emerald-200 dark:border-emerald-500/20">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                {orders.length}
                            </p>
                        </div>

                        {/* TOTAL ITEMS */}
                        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-500/10 p-4 text-center border border-emerald-200 dark:border-emerald-500/20">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Total Items Sold</p>
                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                {orders.reduce((acc, order) =>
                                    acc + order.products.reduce((pAcc, p) => pAcc + p.quantity, 0)
                                    , 0)}
                            </p>
                        </div>

                        {/* TOTAL REVENUE */}
                        <div className="rounded-xl bg-emerald-50 dark:bg-emerald-500/10 p-4 text-center border border-emerald-200 dark:border-emerald-500/20">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Total Revenue
                            </p>

                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                $
                                {orders.reduce((acc, order) =>
                                    acc + order.products.reduce((pAcc, p) => {
                                        return pAcc + (p.product.price * p.quantity)
                                    }, 0)
                                    , 0).toFixed(2)}
                            </p>
                        </div>

                    </div>
                </div>
            </div></div>}
         
        </div>
    );
}