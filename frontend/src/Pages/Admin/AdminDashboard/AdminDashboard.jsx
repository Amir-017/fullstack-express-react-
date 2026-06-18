import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../../Api/api";
import Swal from "sweetalert2";

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [inputSearch, setInputSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getProducts = async (currentPage = 1) => {
    try {
      const res = await api.get(
        `https://e-commerce-nodejs-blush.vercel.app/products/?search=${inputSearch}&dashboardAdmin=1`
      );

      setProducts(res.data.products || []);
      setTotalPages(res.data.totalPages || 1);
      setPage(res.data.page || currentPage);
      setLoading(true);

    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, [inputSearch]);


  const deleteProduct = async (id) => {
    try {

      // update UI immediately
      setProducts((prev) => prev.filter((prod) => prod._id !== id));

      // sweet alert
      const result = await Swal.fire({
        icon: "success",
        title: "Success",
        text: "Product deleted successfully",
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
      // send delete request to server
      const token = JSON.parse(localStorage.getItem("accessToken"));
      await api.delete(
        `https://e-commerce-nodejs-blush.vercel.app/products/${id}`,
        { headers: { authorization: token } }
      );

    } catch (error) {
      console.log(error);
    }

  };




  const forwardPage = async () => {
    if (page < totalPages) {
      setPage((prev) => prev + 1);
      try {
        const res = await api.get(
          `https://e-commerce-nodejs-blush.vercel.app/products?dashboardAdmin=1&page=${page + 1}`
        );

        setProducts(res.data.products || []);

      } catch (error) {
        console.log(error);
      }
    }
  };

  const backwardPage = async () => {
    if (page > 1) {
      setPage((prev) => prev - 1);
      try {
        const res = await api.get(
          `https://e-commerce-nodejs-blush.vercel.app/products?dashboardAdmin=1&page=${page - 1}`
        );

        setProducts(res.data.products || []);

      } catch (error) {
        console.log(error);
      }

    }


  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-blue-gray-800 py-10 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {!loading ? <div className="w-full h-screen flex items-center justify-center">
          <div className="loader"></div>
        </div> : <div>
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
                Admin Dashboard
              </h1>

              <p className="text-gray-500 dark:text-gray-400 mt-2">
                Manage Products Easily
              </p>
            </div>

            <button
              onClick={() => navigate("/adminDashboard/addProduct")}
              className="bg-green-600 hover:bg-green-700 dark:bg-blue-gray-700 dark:hover:bg-blue-gray-800 text-white px-6 py-3 rounded-xl shadow-lg transition-all duration-300 hover:scale-105"
            >
              Add Product
            </button>
          </div>

          {/* Search */}
          <div className="mb-10">
            <input
              type="text"
              placeholder="Search Product..."
              value={inputSearch}
              onChange={(e) => setInputSearch(e.target.value)}
              className="w-full p-4 rounded-xl border border-gray-300 dark:border-gray-700
        bg-white dark:bg-blue-gray-900 text-gray-800 dark:text-white
        outline-none focus:ring-2 focus:ring-green-500 transition"
            />
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">

            {products.map((product) => (
              <div
                key={product._id}
                className="bg-white dark:bg-blue-gray-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <img
                  src={product.images?.[0]}
                  alt={product.title}
                  className="w-full h-60 "
                />

                <div className="p-5">
                  <h2 className="font-bold text-lg line-clamp-1 text-gray-800 dark:text-white">
                    {product.title}
                  </h2>

                  <p className="text-green-600 font-bold text-xl mt-2">
                    ${product.price}
                  </p>

                  <p className="text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex gap-3 mt-5">
                    <button
                      onClick={() => navigate(`/adminDashboard/updateProduct/${product._id}`)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 dark:bg-blue-gray-700 dark:hover:bg-blue-gray-800 text-white py-2 rounded-lg transition"
                    >
                      Update
                    </button>

                    <button
                      onClick={() => deleteProduct(product._id)}
                      className="flex-1 bg-red-600 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800 text-white py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {products.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 text-lg mt-10">
              No products found.
            </p>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-5 mt-12">
            <button
              onClick={backwardPage}
              disabled={page === 1}
              className={`px-5 py-2 rounded-lg font-semibold transition
              ${page === 1
                  ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500"
                  : "bg-black dark:bg-white dark:text-black text-white hover:scale-105"
                }`}
            >
              Backward
            </button>

            <div className="bg-white dark:bg-blue-gray-900 dark:text-white shadow px-6 py-2 rounded-xl font-bold">
              {page} / {totalPages}
            </div>

            <button
              onClick={forwardPage}
              disabled={page === totalPages}
              className={`px-5 py-2 rounded-lg font-semibold transition
        ${page === totalPages
                  ? "bg-gray-300 dark:bg-gray-700 cursor-not-allowed text-gray-500"
                  : "bg-black dark:bg-white dark:text-black text-white hover:scale-105"
                }`}
            >
              Forward
            </button>
          </div>
        </div>}


      </div>
    </div>
  );
}

// export default AdminDashboard;