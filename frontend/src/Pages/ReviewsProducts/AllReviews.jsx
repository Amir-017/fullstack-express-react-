import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../Api/api";
import axios from "axios";
// api.get(`https://e-commerce-nodejs-blush.vercel.app/reviews/${productId}`, {

export const AllReviews = () => {
    ////////////////////// States and Hooks ///////////////////////
    const [reviews, setReviews] = useState({});
    const [detailsProduct, setDetailsProduct] = useState({});
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState(
        JSON.parse(localStorage.getItem("userName")) || null
    );
    const { id } = useParams();
    const navigate = useNavigate();

    ///////////////////// Functions //////////////////////
    /// Get Reviews for specific product
    const getReviews = () => {
        const token = JSON.parse(localStorage.getItem("accessToken"));
        api.get(`https://e-commerce-nodejs-blush.vercel.app/reviewProducts/${id}`, {
            headers: {
                authorization: token
            }
        }).then((data) => setReviews(data.data.reviewSpecificProduct));
    };

    /// Get Product Details
    const getDetails = () => {
        api({
            method: "get",
            url: `https://e-commerce-nodejs-blush.vercel.app/products/${id}`,
        }).then((data) => setDetailsProduct(data.data.data));
    };

    ////////////////////// Effects ///////////////////////
    useEffect(() => {
        getReviews();
        getDetails();
    }, []);
    ///////////////////// Set loading for better UI when delete review and when get reviews and details of product ///////////////////////
    setTimeout(() => {
        setLoading(true);
    }, 1300);

    //////////////////////// Function that delete review and set loading when delete review for better UI ///////////////////////
    const deleteReview = async (reviewId) => {
        // Check if the review to be deleted is still in the reviews state before setting deleteLoading to true
        const checkdeletedReview = reviews?.reviews?.find((review) => review._id === reviewId)
        if (checkdeletedReview) setDeleteLoading(true);

        try {
            const token = JSON.parse(localStorage.getItem("accessToken"));
            await api.delete(`https://e-commerce-nodejs-blush.vercel.app/reviewProducts/${detailsProduct._id}/${reviewId}`, {
                headers: {
                    authorization: token
                }
            });
            getReviews();

        } catch (error) {
            console.error("Error deleting review:", error);
        }
    };

    console.log(reviews);
    return (
        <div className="min-h-screen bg-white dark:bg-[#0f172a] transition-colors duration-300">
            {loading ? <div className="max-w-6xl mx-auto p-6">

                <div className="flex flex-col lg:flex-row gap-8 bg-gray-100 dark:bg-[#1e293b] rounded-2xl p-6 shadow-lg">

                    {/* Image */}
                    <div className="w-full lg:w-1/3 flex items-center justify-center">
                        <img
                            src={detailsProduct?.images?.[0]}
                            alt={detailsProduct?.title}
                            className="md:h-[350px] lg:object-cover rounded-xl"
                        />
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-center">

                        <div className="flex justify-between items-start flex-wrap gap-3">

                            <div>
                                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                    {detailsProduct?.title}
                                </h1>

                                <p className="mt-3 text-gray-600 dark:text-gray-300">
                                    {detailsProduct?.description}
                                </p>
                            </div>

                            <button
                                onClick={() => navigate(`/addReview/${id}`)}
                                className="bg-green-700 hover:bg-green-800
                                        dark:bg-blue-gray-700 dark:hover:bg-blue-gray-600
                                        text-white px-5 py-2 rounded-lg font-bold transition"
                            >
                                + Add Review
                            </button>

                        </div>

                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">

                            <div className="bg-white dark:bg-[#273449] rounded-xl p-4">
                                <p className="text-sm text-gray-500">Price</p>
                                <h3 className="font-bold text-green-700 dark:text-white">
                                    ${detailsProduct?.price}
                                </h3>
                            </div>

                            <div className="bg-white dark:bg-[#273449] rounded-xl p-4">
                                <p className="text-sm text-gray-500">Brand</p>
                                <h3 className="font-bold text-gray-900 dark:text-white">
                                    {detailsProduct?.brand}
                                </h3>
                            </div>

                            <div className="bg-white dark:bg-[#273449] rounded-xl p-4">
                                <p className="text-sm text-gray-500">Category</p>
                                <h3 className="font-bold text-gray-900 dark:text-white">
                                    {detailsProduct?.category}
                                </h3>
                            </div>

                            <div className="bg-white dark:bg-[#273449] rounded-xl p-4">
                                <p className="text-sm text-gray-500">Rating</p>
                                <h3 className="font-bold text-yellow-900">
                                    ⭐ {detailsProduct?.rating}
                                </h3>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Reviews */}

                <div className="mt-12">

                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
                        Customer Reviews
                    </h2>

                    {!reviews?.reviews?.length ? (

                        <div className="bg-gray-100 dark:bg-[#1e293b] rounded-2xl p-12 text-center shadow">

                            <h3 className="text-2xl font-bold text-gray-700 dark:text-white">
                                No Reviews Yet
                            </h3>

                            <p className="mt-3 text-gray-500 dark:text-gray-300">
                                Be the first one to write a review.
                            </p>

                        </div>

                    ) : (

                        <div className="grid gap-6">

                            {reviews?.reviews?.map((review) => (

                                <div
                                    key={review._id}
                                    className="bg-gray-100 dark:bg-[#1e293b] rounded-2xl p-6 shadow-lg"
                                >

                                    <div className="flex justify-between items-start flex-wrap gap-4">

                                        <div>

                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                                {review.userName?.name}
                                            </h3>

                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {review.userName?.email}
                                            </p>

                                        </div>

                                        <button
                                            disabled={deleteLoading}
                                            onClick={() => deleteReview(review._id)}
                                            className={`${deleteLoading ? 'bg-red-900' : 'bg-red-600 hover:bg-red-700'}
                                            ${currentUser === review.userName?.name || currentUser === 'amir whdan' ? 'block' : 'hidden'}
                                            text-white px-4 py-2 rounded-lg transition`}
                                        >
                                            {deleteLoading ? 'Deleting...' : 'Delete'}
                                        </button>

                                    </div>

                                    <div className="mt-5 flex items-center gap-2 text-yellow-500 text-lg font-bold">
                                        ⭐ {review.rating}/5
                                    </div>

                                    <div className="mt-5">

                                        <p className="font-semibold text-gray-700 dark:text-gray-200">
                                            Title
                                        </p>

                                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                                            {review.title}
                                        </p>

                                    </div>

                                    <div className="mt-5">

                                        <p className="font-semibold text-gray-700 dark:text-gray-200">
                                            Review
                                        </p>

                                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                                            {review.review}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    )}
                    <div className="mt-6 flex justify-end gap-4 flex-col lg:flex-row">
                        <button
                            onClick={() => navigate(`/addReview/${id}`)}
                            className="bg-green-700 hover:bg-green-800
                                    dark:bg-blue-gray-700 dark:hover:bg-blue-gray-600
                                    text-white px-5 py-2 rounded-lg font-bold transition"
                        >
                            + Add Review
                        </button>

                        <button
                            onClick={() => navigate(`/details/${id}`)}
                            className=" bg-green-700 hover:bg-green-800
                                    dark:bg-blue-gray-700 dark:hover:bg-blue-gray-600
                                    text-white px-5 py-2 rounded-lg font-bold transition"
                        >
                            Back to Details page
                        </button>
                    </div>
                </div>
            </div> : <div className="flex justify-center items-center h-screen">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-32 w-32"></div>
            </div>}



        </div>
    );
};
