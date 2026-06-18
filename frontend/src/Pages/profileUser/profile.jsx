import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api";
import Swal from "sweetalert2";


function Profile() {
  const [userDetail, setUserDetail] = useState({})
  const [checkDeleteUser, setCheckDeleteUser] = useState(false)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()
  const token = JSON.parse(localStorage.getItem('accessToken'))

  const getuserDetails = () => {
    api.get('https://e-commerce-nodejs-blush.vercel.app/users/profile', {
      headers: {
        authorization: token
      }
    }).then((data) => setUserDetail(data.data.data))
    setLoading(true)
  }

  // delete user
  const deleteUser = async () => {
    setCheckDeleteUser(true)

    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this account anymore!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      background: document.documentElement.classList.contains("dark")
        ? "#20242b"
        : "#ffffff",
      color: document.documentElement.classList.contains("dark")
        ? "#ffffff"
        : "#000000",
    })
    if (result.isConfirmed) {
      await api.delete('http://localhost:3000/users/deleteUser', {
        headers: {
          authorization: token
        }
      }).then((data) => {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userName')
        navigate('/login', { state: { message: "Verification email sent successfully, please check your email or spam folder" } })
      })
    } else {
      setCheckDeleteUser(false)

    }

  }

  // handle function logout

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    navigate("/login");
  };

  useEffect(() => {
    getuserDetails()

  }, [])

  const goToEditeProfile = () => {
    navigate('/editeProfile')
  }
  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10 bg-gray-100 dark:bg-blue-gray-900">
      {!loading ? (
        <div className="w-full h-screen flex justify-center items-center">
          <div className="loader"></div>
        </div>
      ) : <div className="w-full max-w-4xl bg-white dark:bg-slate-800 rounded-3xl shadow-2xl overflow-hidden border border-gray-200 dark:border-slate-700">

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

          <button
            onClick={handleLogout}
            className="px-5 py-2.5 rounded-xl bg-red-500 dark:bg-white/10 hover:bg-red-600 dark:hover:bg-red-600 border border-white/20 text-white font-semibold transition-all duration-300"
          >
            Logout
          </button>

        </div>

        {/* Body */}
        <div className="px-8 py-8 dark:bg-blue-gray-800">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Full Name
              </label>

              <input
                type="text"
                value={userDetail.name || ""}
                readOnly
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-900 "
              />
            </div>

            {/* Email */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                value={userDetail.email || ""}
                readOnly
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-900 "
              />
            </div>

            {/* Password */}
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                Password
              </label>

              <input
                type="text"
                value="********"
                readOnly
                className="w-full p-3 rounded-xl border border-gray-300 dark:border-slate-600 bg-gray-50 dark:bg-slate-900 text-gray-900 "
              />
            </div>

          </div>

          {/* Actions */}
          <div className="pt-6 mt-8 border-t border-gray-200 dark:border-slate-700 flex justify-end gap-4">

            <button
              onClick={goToEditeProfile}
              className="px-6 py-3 rounded-xl bg-green-600 hover:bg-green-700 dark:bg-blue-gray-700 dark:hover:bg-blue-gray-900 text-white font-semibold transition-all duration-300"
            >
              Edit Profile
            </button>

            <button
              onClick={deleteUser}
              className="px-6 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition-all duration-300"
            >
              {checkDeleteUser ? "Confirm Delete..." : "Delete Profile"}
            </button>

          </div>

        </div>

      </div>}

    </div>
  );
}

export default Profile;