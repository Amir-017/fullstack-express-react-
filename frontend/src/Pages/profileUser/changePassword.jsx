import axios from "axios";
import Swal from "sweetalert2";

import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api";

function ChangePassword() {

  const currentPasswordRef = useRef(null);
  const newPasswordRef = useRef(null);

  const [error, setError] = useState("");
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const currentPassword = currentPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;

    // validation

    if (!currentPassword || !newPassword) {
      return setError("Please fill all fields");
    }

    if (newPassword.length < 6) {
      return setError("New password must be at least 6 characters");
    }

    try {

      const res = await api.patch(
        "https://e-commerce-nodejs-blush.vercel.app/users/convertPassword",
        {
          currentPassword,
          newPassword
        },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken"))
          }
        }
      );

      console.log(res.data);
      await Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
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
      navigate("/");

    } catch (err) {
      setError(err.response?.data || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 
    bg-gray-100 dark:bg-blue-gray-900 transition-colors duration-300">

      <div className="w-full max-w-md 
      bg-white dark:bg-blue-gray-800 
      rounded-xl shadow-xl 
      p-6
      border border-gray-200 dark:border-gray-700">

        <h2 className="text-2xl font-bold mb-6 text-center
        text-gray-800 dark:text-white">
          Change Password
        </h2>

        <div className="mb-6 text-center">
          <span className="inline-block px-3 py-1 text-sm font-medium rounded-full bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
            Security Settings
          </span>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            Keep your account safe by choosing a strong password.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Current Password */}

          <div>
            <label className="block mb-2 font-semibold
            text-gray-700 dark:text-gray-300">
              Current Password
            </label>

            <div className="relative">

              <input
                type={showCurrent ? "text" : "password"}
                ref={currentPasswordRef}
                className="w-full border 
                border-gray-300 dark:border-gray-600
                p-3 rounded-lg
                bg-white dark:bg-gray-900
                text-gray-900 dark:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                dark:focus:ring-green-400"
              />

              <button
                type="button"
                onClick={() => setShowCurrent(prev => !prev)}
                className="absolute right-3 top-3
                text-gray-500 dark:text-gray-300
                hover:text-gray-700 dark:hover:text-white"
              >
                {showCurrent ? "🙈" : "👁️"}
              </button>

            </div>
          </div>


          {/* New Password */}

          <div>
            <label className="block mb-2 font-semibold
            text-gray-700 dark:text-gray-300">
              New Password
            </label>

            <div className="relative">

              <input
                type={showNew ? "text" : "password"}
                ref={newPasswordRef}
                className="w-full border
                border-gray-300 dark:border-gray-600
                p-3 rounded-lg
                bg-white dark:bg-gray-900
                text-gray-900 dark:text-white
                focus:outline-none
                focus:ring-2
                focus:ring-green-500
                dark:focus:ring-green-400"
              />

              <button
                type="button"
                onClick={() => setShowNew(prev => !prev)}
                className="absolute right-3 top-3
                text-gray-500 dark:text-gray-300
                hover:text-gray-700 dark:hover:text-white"
              >
                {showNew ? "🙈" : "👁️"}
              </button>

            </div>
          </div>

          <p className="text-red-600 dark:text-red-400 text-sm">
            {error}
          </p>

          <button
            type="submit"
            className="w-full 
            bg-green-600 hover:bg-green-700
            dark:bg-emerald-600 dark:bg-blue-gray-700 dark:hover:bg-blue-gray-900
            text-white
            p-3 rounded-lg
            font-semibold
            transition"
          >
            Change Password
          </button>

        </form>

      </div>

    </div>
  );
}

export default ChangePassword;