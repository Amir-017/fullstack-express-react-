import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api";
import { useLocation } from "react-router-dom";
export default function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const navigate = useNavigate();
  const location = useLocation();


  const handleSubmit = async (e) => {

    e.preventDefault();

      // Example: redirect to home page after login
    if (!email || !password) {

      setError('You must fill all inputs')
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Email format is invalid');
      return;
    }



    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("https://e-commerce-nodejs-blush.vercel.app/users/login", {
        email,
        password,
      }, { withCredentials: true });

      console.log("Login response:", res.data);

      localStorage.setItem("accessToken", JSON.stringify(res.data.accesstoken))
      localStorage.setItem("userName", JSON.stringify(res.data.name));
     
      
      navigate("/");
       
    } catch (error) {
      console.error("Login error:", error);

      if (error.response) {
        setError(error.response.data);
      } else {
        setError(`Request error: ${error.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-blue-gray-900">
      {location.state?.message && <div className="w-full px-5 flex justify-end mb-4">
        <h1 className="text-gray-700 w-[300px] font-medium bg-white p-4 rounded-full flex items-center justify-center text-center text-sm dark:bg-slate-800 dark:text-gray-300 animate-bounce">
          {location.state?.message}
        </h1>

      </div>}


      <div className="w-full max-w-sm bg-white dark:bg-blue-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
          Login
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 dark:border-blue-gray-600 bg-white dark:bg-blue-gray-900 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-gray-300 dark:border-blue-gray-600 bg-white dark:bg-blue-gray-900 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
               placeholder="Your password"
            />
            <p className="text-red-800 dark:text-red-400 forErorr">{error}</p>
            <p className="text-sm dark:text-white text-gray-800">Forgot your password? <a onClick={() => navigate("/forgetPassword",{state: { email: email }})} className="text-green-600 dark:text-gray-500 hover:underline text-sm cursor-pointer">Click here</a></p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-700 text-white font-semibold py-2 rounded-md transition dark:bg-blue-gray-900 dark:hover:bg-blue-gray-700 dark:disabled:bg-blue-gray-800"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={goToRegister}
            className="text-green-600 dark:text-gray-600 hover:underline font-medium"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}