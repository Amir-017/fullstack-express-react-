import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../../Api/api";

export default function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    images: [""],
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

  const [loading, setLoading] = useState(true);

  // ==========================
  // Get Product
  // ==========================

  const getProduct = async () => {
    try {
      const res = await api.get(
        `https://e-commerce-nodejs-blush.vercel.app/products/${id}`
      );

      setProduct(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);
  // console.log(product);
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
  // Update Product
  // ==========================

  const updateProduct = async (e) => {
    e.preventDefault();
    const token = JSON.parse(localStorage.getItem("accessToken"));

    try {
      await api.patch(
        `https://e-commerce-nodejs-blush.vercel.app/products/${id}`,
        product,
        {
          headers: {

            authorization: token,
          },
        }
      );

      const result = await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product updated successfully",
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
        text: "Failed to update product",
        confirmButtonColor: "#dc2626",
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <h1 className="loader text-2xl font-bold"></h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 dark:from-blue-gray-900 dark:to-black py-10 px-4 transition-colors duration-300">
      <div className="max-w-4xl mx-auto bg-white dark:bg-blue-gray-900 rounded-3xl shadow-2xl overflow-hidden">

        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-green-800 dark:from-gray-700 dark:to-gray-900 p-8">
          <h1 className="text-4xl font-bold text-white">
            Update Product
          </h1>

          <p className="text-green-100 dark:text-gray-400 mt-2">
            Edit product information and save your changes.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={updateProduct} className="p-8 space-y-6">

          {/* Image */}
          <div>
            <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
              Product Image URL
            </label>

            <input
              type="text"
              name="images"
              defaultValue={product.images?.[0] || ""}
              onChange={handleChange}
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
                type="text"
                name="rating"
                value={product.rating}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-blue-gray-800 text-gray-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700 dark:text-gray-200">
                Discount Percentage
              </label>

              <input
                type="text"
                name="discountPercentage"
                value={product.discountPercentage}
                onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-blue-gray-800 text-gray-800 dark:text-white rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

          </div>

          {/* Submit */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 dark:from-gray-700 dark:to-gray-900 text-white py-4 rounded-xl text-lg font-bold transition-all duration-300 hover:scale-[1.01] shadow-lg"
            >
              Update Product
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}