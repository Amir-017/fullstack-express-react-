import axios from "axios";
import Swal from "sweetalert2";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRef } from "react";
import api from "../../Api/api";

function EditeProfile() {
  const [userDetail, setUserDetail] = useState({});
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const getuserDetails = () => {
    api
      .get("https://e-commerce-nodejs-blush.vercel.app/users/profile", {
        headers: {
          authorization: JSON.parse(localStorage.getItem("accessToken")),
        },
      })
      .then((data) => setUserDetail(data.data.data));
    setLoading(true);
  };

  useEffect(() => {
    getuserDetails();
  }, []);

  //handle form:
  const handleSubmit = async (e) => {
    e.preventDefault();

    const name = nameRef.current.value;
    const email = emailRef.current.value;

    const nameRegex = /^[A-Za-z\s]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !email) {
      return setError("Please fill all fields");
    }

    if (!nameRegex.test(name)) {
      return setError(
        "Name must contain only letters and be at least 3 characters.",
      );
    }

    if (!emailRegex.test(email)) {
      return setError("Invalid email format.");
    }

    try {
      const res = await api.patch(
        "https://e-commerce-nodejs-blush.vercel.app/users/editeProfile",
        {
          name,
          email,
        },
        {
          headers: {
            authorization: JSON.parse(localStorage.getItem("accessToken")),
          },
        },
      );

      let newName = JSON.parse(localStorage.getItem("userName"));
      newName = res.data.data.name;
      localStorage.setItem("userName", JSON.stringify(newName));


      await Swal.fire({
        icon: "success",
        title: "Success",
        text: res.data.message,
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

      navigate("/");
    } catch (error) {
      console.log(error);

      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.response?.data || "Something went wrong",
        background: document.documentElement.classList.contains("dark")
          ? "#20242b"
          : "#ffffff",
        color: document.documentElement.classList.contains("dark")
          ? "#ffffff"
          : "#000000",
      });
    }
  };

  const pageChangePassword = () => {
    navigate("/Changepassword");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100 dark:bg-blue-gray-900">

      <div className="w-full max-w-3xl bg-white dark:bg-blue-gray-800 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-blue-gray-700">
        {/* Header */}
        <div className="bg-gradient-to-r from-green-600 to-emerald-500 dark:from-blue-gray-900 dark:to-blue-gray-600 px-8 py-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={`https://ui-avatars.com/api/?name=${userDetail.name || "User"}&background=10b981&color=fff&rounded=true`}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg"
            />

            <div className="text-white">
              <h1 className="text-3xl font-bold">User Profile</h1>
              <p className="text-white/80 mt-1">Manage and view your account information</p>
            </div>
          </div>
        </div>

        {/* Body */}

        <form onSubmit={handleSubmit} className="px-8 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Name */}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                defaultValue={userDetail.name || ""}
                ref={nameRef}
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 dark:bg-blue-gray-900 text-gray-900 dark:text-white"
              />
            </div>

            {/* Email */}

            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                defaultValue={userDetail.email || ""}
                ref={emailRef}
                className="w-full p-3 rounded-lg border border-gray-300 bg-gray-100 dark:bg-blue-gray-900 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <p className="text-red-600">{error}</p>

          {/* Buttons */}

          <div className="pt-4 border-t border-gray-200 dark:border-blue-gray-700 flex justify-end gap-3">
            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg dark:bg-blue-gray-900 dark:hover:bg-blue-gray-700 bg-green-600 hover:bg-green-700 text-white font-semibold transition"
            >
              Update Profile
            </button>

            <button
              type="button"
              className="px-6 py-2.5 rounded-lg dark:bg-blue-gray-900 dark:hover:bg-blue-gray-700 bg-green-800 hover:bg-green-900 text-white font-semibold transition"
              onClick={pageChangePassword}
            >
              Change Password
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditeProfile;
