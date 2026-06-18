import { useEffect, useState } from "react";
import axios from "axios";
import api from "../../Api/api";

const AllCarts = () => {
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const getAllCarts = async () => {
    try {
      setLoading(true);
      setError("");

      const token = JSON.parse(localStorage.getItem("accessToken"));

      const res = await api.get("https://e-commerce-nodejs-blush.vercel.app/cart/allCart", {
        headers: {
          authorization: token,
        },
      });

      console.log(res.data.data);

      setCarts(res.data.data || res.data);
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Failed to fetch carts");
    } finally {
      setLoading(false);
    }
  };


const getInfoUser = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const res = await api.get(`https://e-commerce-nodejs-blush.vercel.app/users/me`, {
        headers: {
          authorization: token
        }
      });
      setUserInfo(res.data.data);
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    getAllCarts();
  }, []);
  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-gray-100 dark:bg-blue-gray-900">
        <h1 className="loader text-2xl font-bold text-gray-800 dark:text-white">
          
        </h1>
      </div>
    );
  }

  return (
    <div className=" bg-gray-100 dark:bg-blue-gray-900 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 rounded-2xl bg-white dark:bg-blue-gray-900 shadow-lg border border-gray-200 dark:border-blue-gray-800 p-6">
          <h1 className="text-3xl font-bold text-center text-gray-900 dark:text-white">
            All Carts
          </h1>
          <p className="text-center text-gray-600 dark:text-gray-300 mt-2">
            View all users carts and their added products
          </p>
        </div>

        {error && (
          <div className="mb-6 rounded-xl bg-red-100 border border-red-300 p-4 text-center text-red-700 font-semibold dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
            {error}
          </div>
        )}

        {carts.every((cart)=> cart.products.length === 0) ? (
          <div className="h-[55vh] flex items-center justify-center">
             <div className="rounded-2xl bg-white dark:bg-blue-gray-900 shadow-lg border border-gray-200 dark:border-blue-gray-800 p-10 text-center ">
            <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-200">
              No carts found. Please check back later.
            </h2>
          </div>
          </div>
         
        ) : (
          <div className="grid gap-6">
            {carts.map((cart) => (
              <div className="">
                {cart.products.length >= 1 && <div
                key={cart._id}
                className="rounded-2xl overflow-hidden bg-white dark:bg-blue-gray-900 shadow-xl border border-gray-200 dark:border-blue-gray-800"
              >
                {/* Header */}
                <div className="px-6 py-4 border-b border-gray-200 dark:border-blue-gray-800 bg-gray-50 dark:bg-blue-gray-800">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                      User: <span className="font-normal text-black dark:text-gray-400">{cart.userName?.name || "Unknown User"}</span>
                    </h2>

                    <span className="inline-block w-fit px-4 py-2 rounded-full text-sm font-semibold bg-blue-100 text-blue-700 dark:bg-blue-gray-700 dark:text-white">
                      {cart.products?.length || 0} Products
                    </span>
                  </div>
                </div>

                {/* Products */}
                <div className="p-6">
                  {
                  !cart.products || cart.products.length === 0 ? (
                    <p className="text-center text-gray-500 dark:text-gray-300 text-lg">
                      This cart has no products
                    </p>
                  ) :
                   (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                      {cart.products.map((item, index) => (
                        <div
                          key={item._id || index}
                          className="rounded-2xl border border-gray-200 dark:border-blue-gray-800 bg-gray-50 dark:bg-blue-gray-800/40 p-4 shadow-md hover:shadow-lg transition-all"
                        >
                          <div className="flex flex-col sm:flex-row gap-4 items-center sm:items-start">
                            <div className="w-full sm:w-32 h-32 rounded-xl overflow-hidden bg-white dark:bg-blue-gray-900 border border-gray-200 dark:border-blue-gray-800 flex items-center justify-center">
                              <img
                                src={item.product?.images[0]}
                                alt={item.product?.title}
                                className="w-full h-full object-cover animate-bounce"
                              />
                            </div>

                            <div className="flex-1 text-center sm:text-left">
                              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                                {item.product?.title}
                              </h3>

                              <div className="space-y-2">
                                <p className="text-gray-700 dark:text-gray-300">
                                  <span className="font-semibold">Price:</span>{" "}
                                  {item.product?.price} EGP
                                </p>

                                <p className="text-gray-700 dark:text-gray-300">
                                  <span className="font-semibold">Quantity:</span>{" "}
                                  {item.quantity}
                                </p>

                                <p className="text-gray-700 dark:text-gray-300">
                                  <span className="font-semibold">Total:</span>{" "}
                                  {(
                                    (item.product?.price || 0) *
                                    (item.quantity || 0)
                                  ).toFixed(2)}{" "}
                                  EGP
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 dark:border-blue-gray-800 bg-gray-50 dark:bg-blue-gray-800/60">
                  <h3 className="text-center text-lg font-bold text-gray-900 dark:text-white">
                    Cart Total:{" "}
                    <span className="text-green-700 dark:text-gray-400">
                      {cart.products
                        ?.reduce(
                          (acc, item) =>
                            acc + (item.product?.price || 0) * (item.quantity || 0),
                          0
                        )
                        .toFixed(2)}{" "}
                      EGP
                    </span>
                  </h3>
                </div>
              </div>}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AllCarts;