import axios from "axios";
import Swal from "sweetalert2";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../Api/api";

export default function AddProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    images: "",
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    brand: "",
    rating: "",
    discountPercentage: "",
    inStock: true,
  });

  // ==========================
  // Handle Change
  // ==========================

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "images") {
      setProduct({
        ...product,
        images: [value],
      });
    } else {
      setProduct({
        ...product,
        [name]: value,
      });
    }
  };

  // ==========================
  // Add Product
  // ==========================

  const addProduct = async (e) => {
    e.preventDefault();
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      await api.post(
        `https://e-commerce-nodejs-blush.vercel.app/products`,
        product
        , {
          headers: {

            authorization: token,
          },
        });

      const result = await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product added successfully",
        confirmButtonColor: document.documentElement.classList.contains("dark")
          ? "#0f1310"
          : "#16a34a",
        background: document.documentElement.classList.contains("dark")
          ? "#20242b"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#ffffff"
          : "#000000",
      });

      if (result.isConfirmed) {
        navigate("/AdminDashboard");
      }
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data?.message || "Something went wrong",
        confirmButtonColor: "#dc2626",
        background: document.documentElement.classList.contains("dark")
          ? "#20242b"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#ffffff"
          : "#000000",
      });
    }
    console.log(product);

  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-blue-gray-900 dark:to-black py-10 px-4 transition-colors duration-300">
      <div className="max-w-5xl mx-auto bg-white dark:bg-blue-gray-900 rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 dark:from-gray-700 dark:to-gray-900 p-8">
          <h1 className="text-4xl font-bold text-white">
            Add Product
          </h1>

          <p className="text-green-100 dark:text-gray-400 mt-2">
            Create a new product and publish it to your store.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={addProduct} className="p-8 space-y-6">

          {/* Image URL */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
              Product Image URL
            </label>

            <input
              type="text"
              name="images"
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-blue-gray-800 text-gray-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Title */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
              Product Title
            </label>

            <input
              type="text"
              name="title"
              value={product.title}
              onChange={handleChange}
              placeholder="Enter product title"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-blue-gray-800 text-gray-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
              Description
            </label>

            <textarea
              rows="5"
              name="description"
              value={product.description}
              onChange={handleChange}
              placeholder="Enter product description"
              className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-blue-gray-800 text-gray-800 dark:text-white rounded-xl p-3 resize-none focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Price & Stock */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Price
              </label>

              <input
                type="number"
                name="price"
                value={product.price}
                onChange={handleChange}
                placeholder="0"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-blue-gray-800 text-gray-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Stock
              </label>

              <input
                type="number"
                name="stock"
                value={product.stock}
                onChange={handleChange}
                placeholder="0"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-blue-gray-800 text-gray-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

          </div>

          {/* Category & Brand */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={product.category}
                onChange={handleChange}
                placeholder="smartphones"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-blue-gray-800 text-gray-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Brand
              </label>

              <input
                type="text"
                name="brand"
                value={product.brand}
                onChange={handleChange}
                placeholder="Apple"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-blue-gray-800 text-gray-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

          </div>

          {/* Rating & Discount */}
          <div className="grid md:grid-cols-2 gap-5">

            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Rating
              </label>

              <input
                type="number"
                step="0.1"
                name="rating"
                value={product.rating}
                onChange={handleChange}
                placeholder="4.5"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-blue-gray-800 text-gray-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Discount Percentage
              </label>

              <input
                type="number"
                name="discountPercentage"
                value={product.discountPercentage}
                onChange={handleChange}
                placeholder="10"
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-blue-gray-800 text-gray-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

          </div>

          {/* Preview */}
          {product.thumbnail && (
            <div>
              <label className="block mb-3 font-semibold text-gray-700 dark:text-gray-200">
                Image Preview
              </label>

              <img
                src={product.thumbnail}
                alt="preview"
                className="w-full md:w-72 h-72 object-cover rounded-2xl border dark:border-gray-700 shadow-lg"
              />
            </div>
          )}

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 dark:from-gray-700 dark:to-gray-900 text-white py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-[1.01] shadow-lg"
            >
              Add Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}