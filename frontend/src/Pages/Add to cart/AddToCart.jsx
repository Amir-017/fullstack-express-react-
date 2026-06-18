import React, { useEffect, useState } from "react";
import emptyCart from "../../imges/shopping_cart-b0846037.png";
import { useNavigate } from "react-router-dom";
import { Button, Card, Typography } from "@material-tailwind/react";
import { FaRegTrashCan } from "react-icons/fa6";
import axios from "axios";
import api from "../../Api/api";
import Swal from "sweetalert2";

const AddToCart = ({ }) => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  /************************************
  *           STATE & DATA
  ************************************/

const getCart = async () => {
  try {
    setLoading(true);

    const res = await api.get(
      "https://e-commerce-nodejs-blush.vercel.app/cart",
      {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken")),
        },
      }
    );

    setCart(res?.data?.data);

  } catch (error) {
    console.log(error);
  } finally {
    setLoading(false);
  }
};

useEffect(() => {
  getCart();
}, []);

  // console.log(cart);

  /************************************
   *           NAVIGATION
   ************************************/

  const goToHome = () => {
    navigate("/");
  };

  /************************************
   *           TABLE CONFIG
   ************************************/

  const TABLE_HEAD = [
    "Product",
    "Unit Price",
    "Quantity",
    "Total Price",
    "Actions",
  ];

  /************************************
   *        INCREASE QUANTITY
   ************************************/

  const incress = async (product) => {
    const productId = product.product._id;

    let counter = JSON.parse(localStorage.getItem("counter"));
    const newCount = counter + 1;
    localStorage.setItem("counter", JSON.stringify(newCount));

    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      // Optimistic UI update
      setCart((prev) =>
        prev?.map((item) =>
          item.product._id === productId
            ? {
              ...item,
              quantity: item.quantity + 1,
            }
            : item
        )
      );

      const res = await api.patch(
        `https://e-commerce-nodejs-blush.vercel.app/cart/${productId}`,
        { quantity: product.quantity + 1 },
        {
          headers: {
            authorization: token,
          },
        }
      );
      // to make header know that cart is updated and update the counter in header
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response?.data || error.message
      );
    }
  };

  /************************************
   *        DECREASE QUANTITY
   ************************************/

  const decress = async (product) => {
    const productId = product.product._id;

    let counter = JSON.parse(localStorage.getItem("counter"));
    const newCount = counter - 1;
    localStorage.setItem("counter", JSON.stringify(newCount));

    console.log(product);

    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      // Optimistic UI update
      setCart((prev) =>
        prev?.map((item) =>
          item.product._id === productId
            ? {
              ...item,
              quantity: item.quantity - 1,
            }
            : item
        )
      );

      const res = await api.patch(
        `https://e-commerce-nodejs-blush.vercel.app/cart/${productId}`,
        { quantity: product.quantity - 1 },
        {
          headers: {
            authorization: token,
          },
        }
      );
      // to make header know that cart is updated and update the counter in header
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response?.data || error.message
      );
    }
  };

  /************************************
   *            CLEAR CART
   ************************************/

  const clear = async () => {
    let counter = JSON.parse(localStorage.getItem("counter"));

    const newCount = 0;
    localStorage.setItem("counter", JSON.stringify(newCount));

    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const result = Swal.fire({
        title: "Are you sure?",
        text: "This action will clear your entire cart!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#dc2626",
        cancelButtonColor: "#16a34a",
        confirmButtonText: "Yes, clear it!",
        background: document.documentElement.classList.contains("dark")
          ? "#1e293b"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#ffffff"
          : "#000000",
      }).then(async (result) => {
        if (result.isConfirmed) {
          setCart([]);
          const res = await api.delete(
            `https://e-commerce-nodejs-blush.vercel.app/cart`,
            {
              headers: {
                authorization: token,
              },
            }
          );
          navigate("/");
  // to make header know that cart is updated and update the counter in header
      window.dispatchEvent(new Event("cartUpdated"));
        }
      });

    
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response?.data || error.message
      );
    }
  };

  /************************************
   *        DELETE PRODUCT
   ************************************/

  const deleteProduct = async (product) => {
    const productId = product.product._id;
    let counter = JSON.parse(localStorage.getItem("counter"));
    const newCount = counter - product.quantity;
    localStorage.setItem("counter", JSON.stringify(newCount));

    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));

      setCart((prev) =>
        prev?.filter((item) => item.product._id !== productId)
      );

      const res = await api.delete(
        `https://e-commerce-nodejs-blush.vercel.app/cart/${productId}`,
        {
          headers: {
            authorization: token,
          },
        }
      );
      // to make header know that cart is updated and update the counter in header
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      console.error(
        "Error updating cart:",
        error.response?.data || error.message
      );
    }
  };

  /************************************
   *       SCROLL RESTORE FIX
   ************************************/

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
  }, []);


  return (
  <div className="min-h-screen w-full bg-gray-100 dark:bg-[#0f172a] px-3 sm:px-6 py-10">

  {/* LOADING */}
  {loading ? (
    <div className="h-screen flex items-center justify-center">
      <div className="loader"></div>
    </div>
  ) : cart?.length === 0 ? (

    /* EMPTY CART */
    <div className="h-screen flex items-center justify-center">
      <div className="flex flex-col items-center gap-4 text-center">
        <img
          src={emptyCart}
          alt="empty cart"
          className="w-[180px] sm:w-[220px]"
        />

        <h2 className="text-gray-600 dark:text-gray-300 text-lg">
          Your shopping cart is empty
        </h2>

        <button
          onClick={goToHome}
          className="bg-green-700 hover:bg-green-800 dark:bg-[#282d45] dark:hover:bg-[#1f243b] text-white font-bold px-10 py-3 rounded-md transition"
        >
          Go Shopping Now
        </button>
      </div>
    </div>

  ) : (

    /* CART CONTENT */
    <div className="w-full max-w-[1200px] mx-auto">

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-left border-collapse">

          <thead>
            <tr className="bg-green-800 dark:bg-[#282d45] text-white">
              {TABLE_HEAD.map((head, index) => (
                <th key={index} className="px-4 sm:px-6 py-4 text-center text-sm font-bold uppercase">
                  {head}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {cart.map((item, index) => (
              <tr
                key={index}
                className="text-center border-b dark:border-white/10 bg-white dark:bg-[#1c2135]"
              >

                <td className="px-4 sm:px-6 py-5 whitespace-nowrap dark:text-white flex items-center ">
                  {item.product?.title}
                </td>

                <td className="px-4 sm:px-6 py-5 text-emerald-600 font-semibold dark:text-white">
                  {item.product?.price} EGP
                </td>

                <td className="px-4 sm:px-6 py-5">
                  <div className="inline-flex items-center border rounded-lg overflow-hidden">

                    <button
                      onClick={() => decress(item)}
                      className="px-3 py-2 bg-gray-700 text-white"
                    >
                      -
                    </button>

                    <span className="px-4 py-2 bg-white dark:bg-[#1c2135] dark:text-white">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => incress(item)}
                      className="px-3 py-2 bg-gray-700 text-white"
                    >
                      +
                    </button>

                  </div>
                </td>

                <td className="px-4 sm:px-6 py-5 font-bold text-green-600 dark:text-white">
                  {(item.product?.price * item.quantity).toFixed(2)} EGP
                </td>

                <td className="px-4 sm:px-6 py-5">
                  <button
                    onClick={() => deleteProduct(item)}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
                  >
                    Delete
                  </button>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

      {/* SUMMARY */}
      <div className="mt-10 p-5 mb-10 bg-white dark:bg-[#1c2135] rounded-2xl shadow-xl border dark:border-white/10">

        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          <button
            onClick={clear}
            className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-xl font-bold w-full md:w-auto"
          >
            Clear Cart
          </button>

          <div className="text-center">
            <p className="text-gray-500 dark:text-gray-400">
              Total Items
            </p>

            <h2 className="text-xl font-bold text-gray-900 dark:text-white">
              {cart.length} Items
            </h2>

            <p className="text-green-600 dark:text-gray-300 font-bold mt-2">
              {cart.reduce(
                (sum, item) => sum + item.product.price * item.quantity,
                0
              ).toFixed(2)} EGP
            </p>
          </div>

          <button
            onClick={() => navigate("/order")}
            className="bg-gradient-to-r from-green-700 to-green-900  dark:from-[#0f172a] dark:to-[#1c2135] text-white dark:text-white px-8 py-3 rounded-xl font-bold w-full md:w-auto transition hover:scale-105"
          >
            Checkout →
          </button>

        </div>
      </div>

    </div>

  )}
</div>
  );
};

export default AddToCart;
