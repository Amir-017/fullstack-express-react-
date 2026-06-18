import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
import api from "../../Api/api";
const DetailsItem = ({ aboutAdding, setAboutAdding }) => {
  //////////////// States and Hooks ////////////////
  const [detailsProduct, setDetailsProduct] = useState({});
  const [userInfo, setUserInfo] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  //////////////// Functions ////////////////

  const getDetails = () => {
    api({
      method: "get",
      url: `https://e-commerce-nodejs-blush.vercel.app/products/${id}`,
    }).then((data) => setDetailsProduct(data.data.data));
  };
  //
  const getInfoUser = async (id) => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const res = await api.get(`https://e-commerce-nodejs-blush.vercel.app/users/profile`, {
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

  /////////////////// Effects ////////////////


  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
    getDetails();
    getInfoUser();
  }, []);


  /////////////////// function that add product to cart ////////////////
  const addToCart = async () => {
    const token = JSON.parse(localStorage.getItem("accessToken"));
    let counter = JSON.parse(localStorage.getItem("counter"));
  

    try {
      if (userInfo && userInfo.role === "admin") {
        await Swal.fire({
          icon: "error",
          title: "Error",
          text: 'Sorry you are admin you can\'t  add product to cart',
          confirmButtonColor: "#dc2626",
         background: document.documentElement.classList.contains("dark")
        ? "#20242b"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#ffffff"
        : "#000000",
        });
        return;
      }

      await Swal.fire({
        icon: "success",
        title: "Success",
        text: 'Product added to cart successfully',
         confirmButtonColor:document.documentElement.classList.contains("dark")
          ? "#0f1310"
          : "#16a34a",
         background: document.documentElement.classList.contains("dark")
        ? "#20242b"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#ffffff"
        : "#000000",

      });
      const res = await api.post(
        "https://e-commerce-nodejs-blush.vercel.app/cart/addTocart",
        {
          products: [{ product: detailsProduct._id, quantity: 1 }]
        },
        {
          headers: {
            authorization: token
          }
        }
      );
     
       // to make header know that cart is updated and update the counter in header
      window.dispatchEvent(new Event("cartUpdated"));
    } catch (error) {
      await Swal.fire({
        icon: "error",
        title: "Error",
        text: 'Please login to add products to cart',
        confirmButtonColor: "#dc2626",
         background: document.documentElement.classList.contains("dark")
        ? "#20242b"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#ffffff"
        : "#000000",
      });
      navigate("/login");
      return;
    }
  }; 
  return (
    <div className="w-full min-h-[90vh] flex items-center justify-center bg-[#EAEAEA] dark:bg-blue-gray-900 py-10">
      {detailsProduct._id ? <div className="w-full max-w-6xl bg-white dark:bg-blue-gray-800 rounded-2xl shadow-xl overflow-hidden">

        <div className="flex flex-col lg:flex-row">

          {/* ================= LEFT: GALLERY ================= */}
          <div className="w-full lg:w-3/5 p-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 ">

              {detailsProduct.images?.map((item, i) => (
                <div key={i} className=" overflow-hidden rounded-xl shadow-md group ">

                  <img
                    src={item}
                    alt={`product-${i}`}
                    className=" h-[220px]  transition-transform duration-300 group-hover:scale-105 flex justify-center items-center w-full"
                  />

                </div>
              ))}

            </div>

          </div>

          {/* ================= RIGHT: DETAILS ================= */}
          <div className="w-full lg:w-2/5 p-6 flex flex-col justify-center">

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center lg:text-start">
              {detailsProduct?.title}
            </h1>

            <p className="text-gray-600 dark:text-gray-300 mt-3 text-sm leading-relaxed text-center lg:text-start">
              {detailsProduct?.description}
            </p>

            <hr className="my-4 border-gray-300 dark:border-gray-700" />

            {/* Info Row */}
            <div className="flex flex-wrap gap-4 text-sm justify-center lg:justify-start">

              <p className="font-semibold text-gray-800 dark:text-white">
                Rating: <span className="text-green-600 dark:text-blue-gray-300">{detailsProduct?.rating}</span>
              </p>

              <p className="font-semibold text-gray-800 dark:text-white">
                Brand:{" "}
                <span className="text-green-600 dark:text-blue-gray-300">
                  {detailsProduct.brand || detailsProduct.tags?.join(", ") || "UNKNOWN"}
                </span>
              </p>

              <p className="font-semibold text-gray-800 dark:text-white">
                Category: <span className="text-green-600 dark:text-blue-gray-300">{detailsProduct?.category}</span>
              </p>

            </div>

            {/* PRICE BOX */}
            <div className="mt-6 p-4 rounded-xl bg-gray-100 dark:bg-[#232a45]">

              <p className="line-through text-gray-500 text-sm">
                {detailsProduct?.price} EGP
              </p>

              <div className="flex items-center justify-between mt-2">

                <h2 className="text-xl font-bold text-green-700 dark:text-blue-gray-300">
                  {(
                    detailsProduct?.price -
                    detailsProduct?.price * (detailsProduct?.discountPercentage / 100)
                  ).toFixed(2)}{" "}
                  EGP
                </h2>

                <span className="bg-green-700 dark:bg-blue-gray-700 text-white px-3 py-1 rounded-md text-sm">
                  {detailsProduct?.discountPercentage}% OFF
                </span>

              </div>

            </div>

            {/* ACTION BUTTONS */}
            <div className="flex gap-3 mt-6 justify-center lg:justify-start">

              <Button
                onClick={() => addToCart()}
                className="bg-green-700 hover:bg-green-800 dark:bg-[#232a45] dark:hover:bg-[#232a45] font-bold flex items-center gap-2 transition hover:scale-105"
              >
                Add to Cart <CiShoppingCart className="text-xl" />
              </Button>

              <button
                onClick={() => navigate(`/reviews/${detailsProduct._id}`)}
                className="bg-lime-700 hover:bg-lime-600 text-white px-5 py-2 rounded-md font-bold dark:bg-[#232a45] transition hover:scale-105"
              >
                All Reviews
              </button>

            </div>
            {/* ================= END OF DETAILS ================= */}
          </div>
        </div>
      </div> : <div className="loader w-full h-full flex items-center justify-center"></div>}

    </div>
  );
};

export default DetailsItem;
