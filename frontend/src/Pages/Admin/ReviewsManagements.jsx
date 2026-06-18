import { useEffect, useState } from "react";
import api from "../../Api/api";
import axios from "axios";

export const ReviewsManagements = () => {

    const [loading, setLoading] = useState(false);
    const [allReviews, setAllReviews] = useState([]);
    const [deleteLoading, setDeleteLoading] = useState(null);


    useEffect(() => {
        getAllReviews();
    }, []);

    async function getAllReviews() {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        try {
            const { data } = await api.get(
                "https://e-commerce-nodejs-blush.vercel.app/reviewProducts", {
                headers: {
                    authorization: `${token}`
                }
            }
            );
            setAllReviews(data.allReviews);
            setLoading(true);
        } catch (error) {
            console.log(error);
        }
    }



    const deleteReview = async (reviewId, productId) => {
        setDeleteLoading(reviewId);



        try {
            const token = JSON.parse(localStorage.getItem("accessToken"));
            await api.delete(`https://e-commerce-nodejs-blush.vercel.app/reviewProducts/${productId}/${reviewId}`, {
                headers: {
                    authorization: token
                }
            });
            await getAllReviews();
            setDeleteLoading(null);


        } catch (error) {
            console.error("Error deleting review:", error);
            setDeleteLoading(null);
        }
    };

    console.log(allReviews);
    return (

        <div className="min-h-screen bg-white dark:bg-[#0f172a] transition-colors duration-300">
            {!loading ? <div className="min-h-screen flex justify-center items-center bg-white dark:bg-[#0f172a]">
                <span className="loader"></span>
            </div> : <div className="min-h-screen bg-gray-100 dark:bg-[#0f172a] transition-all duration-300">

                <div className="max-w-7xl mx-auto px-5 py-10">

                    {/* Header */}

                    <div className="mb-10 text-center">

                        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                            Reviews Management
                        </h1>

                        <p className="mt-4 text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                            Monitor customer reviews, inspect feedback, and remove inappropriate
                            reviews to keep your marketplace trustworthy and professional.
                        </p>

                    </div>

                    {/* Products */}

                    <div className="space-y-10">

                        {
                            allReviews.map((item) => (
                                item?.reviews?.length >= 1 &&
                                <div
                                    key={item._id}
                                    className="bg-white dark:bg-[#1e293b] rounded-3xl shadow-xl p-6"
                                >
                                    {/* Product */}

                                    <div className="flex flex-col lg:flex-row gap-6  justify-center items-center">

                                        <img
                                            src={item.product.images[0]}
                                            alt=""
                                            className=" lg:w-[260px] h-[250px] w-[260px]  rounded-2xl transition duration-500 hover:scale-105 "
                                        />

                                        <div className="flex-1">

                                            <h2 className="text-3xl font-bold text-gray-800 dark:text-white">
                                                {item.product.title}
                                            </h2>

                                            <p className="mt-3 text-gray-600 dark:text-gray-300">
                                                {item.product.description}
                                            </p>

                                            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">

                                                <div className="bg-gray-100 dark:bg-[#334155] p-3 rounded-xl">
                                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                                        Price
                                                    </p>

                                                    <h3 className="font-bold text-indigo-600 dark:text-white">
                                                        ${item.product.price}
                                                    </h3>
                                                </div>

                                                <div className="bg-gray-100 dark:bg-[#334155] p-3 rounded-xl">
                                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                                        Rating
                                                    </p>

                                                    <h3 className="font-bold text-yellow-900">
                                                        ⭐ {item.product.rating}
                                                    </h3>
                                                </div>

                                                <div className="bg-gray-100 dark:bg-[#334155] p-3 rounded-xl">
                                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                                        Brand
                                                    </p>

                                                    <h3 className="font-bold text-gray-700 dark:text-white">
                                                        {item.product.brand}
                                                    </h3>
                                                </div>

                                                <div className="bg-gray-100 dark:bg-[#334155] p-3 rounded-xl">
                                                    <p className="text-sm text-gray-500 dark:text-gray-300">
                                                        Category
                                                    </p>

                                                    <h3 className="font-bold text-gray-700 dark:text-white">
                                                        {item.product.category}
                                                    </h3>
                                                </div>

                                            </div>
                                        </div>
                                    </div>

                                    {/* Reviews */}

                                    <div className="mt-8">

                                        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-5">
                                            Customer Reviews
                                        </h3>

                                        {item.reviews.length === 0 ? (
                                            <div className="bg-gray-100 dark:bg-[#334155] rounded-xl p-8 text-center">

                                                <h3 className="text-xl font-bold text-gray-700 dark:text-white">
                                                    No Reviews Yet
                                                </h3>

                                            </div>
                                        ) : (
                                            <div className="grid gap-5">

                                                {item.reviews.map((review) => (
                                                    <div
                                                        key={review._id}
                                                        className="bg-gray-100 dark:bg-[#334155] rounded-2xl p-5"
                                                    >
                                                        <div className="flex justify-between items-start flex-wrap gap-3">

                                                            <div>
                                                                <h4 className="font-bold text-lg text-gray-800 dark:text-white">
                                                                    {review.userName.name}
                                                                </h4>

                                                                <p className="text-gray-500 dark:text-gray-300">
                                                                    {review.userName.email}
                                                                </p>

                                                                <p className="mt-2 text-yellow-900 font-semibold">
                                                                    ⭐ {review.rating}
                                                                </p>
                                                            </div>

                                                            <button
                                                                disabled={deleteLoading}
                                                                onClick={() => deleteReview(review._id, item.product._id)}
                                                                className={`${deleteLoading === review._id ? 'bg-red-900' : 'bg-red-600 hover:bg-red-700'}
                                                                text-white px-4 py-2 rounded-lg transition`}
                                                            >
                                                                {deleteLoading === review._id ? 'Deleting...' : 'Delete'}
                                                            </button>
                                                        </div>

                                                        <div className="mt-5">

                                                            <p className="font-semibold text-gray-700 dark:text-white">
                                                                Title
                                                            </p>

                                                            <p className="text-gray-600 dark:text-gray-300 mt-1">
                                                                {review.title}
                                                            </p>

                                                        </div>

                                                        <div className="mt-4">

                                                            <p className="font-semibold text-gray-700 dark:text-white">
                                                                Review
                                                            </p>

                                                            <p className="text-gray-600 dark:text-gray-300 mt-1">
                                                                {review.review}
                                                            </p>

                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}

                                    </div>
                                </div>
                            ))}

                    </div>
                    {/* if reviews not found */}

                    {allReviews.every(item => item.reviews.length === 0) && (
                        <div className="flex min-h-[400px] items-center justify-center rounded-3xl border border-gray-800 bg-gray-600 dark:bg-[#0f172a] p-10 shadow-[0_0_40px_rgba(0,0,0,0.5)]">
                            <div className="text-center">
                                <div className="mb-6 text-7xl">📝</div>

                                <h1 className="mb-3 text-3xl font-bold tracking-wide text-white">
                                    No Reviews Yet
                                </h1>

                                <p className="text-lg text-gray-300 dark:text-gray-400">
                                    Looks like no one has reviewed products yet.
                                </p>



                                <div className="mt-8 inline-flex rounded-xl border border-gray-700 bg-gray-900 dark:bg-[#0f172a] px-5 py-3 text-sm text-yellow-400">
                                    ⭐ All Reviews will Appear Here As soon as they are submitted ⭐
                                </div>
                            </div>
                        </div>
                    )}
                </div>

            </div> }
           
            {/* } */}
        </div>
    );
}