import { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../../Api/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setconfirmedPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmedPassword) {
      setError("Please fill all fields");

      return;
    }

    const nameRegex = /^[A-Za-z\s]{3,}$/;

    if (!nameRegex.test(name)) {
      setError("Name must contain letters only");
      return;
    }

    if (password !== confirmedPassword) {
      setError("Passwords do not match");
      
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError("Email format is invalid");
      return;
    }
    try {
      setLoading(true);

      const res = await  api.post("https://e-commerce-nodejs-blush.vercel.app/users", {
        name,
        email,
        password,
        confirmedPassword,
      });

      console.log("Registration response:", res.data);
      

      navigate("/login", { state: { email,password } });

    } catch (error) {
      

      if (error.response) {
        setError(error.response.data);
      } 
    } finally {
      setLoading(false);
    }
  };
   
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-blue-gray-900">
      <div className="w-full max-w-sm bg-white dark:bg-blue-gray-800 shadow-md rounded-xl p-6">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-gray-100">
          Register
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 dark:border-blue-gray-600 bg-white dark:bg-blue-gray-900 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Your name"
            />
          </div>

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
              placeholder="At least 6 characters"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmedPassword}
              onChange={(e) => setconfirmedPassword(e.target.value)}
              className="w-full border border-gray-300 dark:border-blue-gray-600 bg-white dark:bg-blue-gray-900 text-gray-900 dark:text-gray-100 rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Re-type your password"
            />
            <p className="text-red-900 dark:text-red-400">{error}</p>
          </div>

          <button
            
            type="submit"
            as="link"
            disabled={loading}
            className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-700 text-white font-semibold py-2 rounded-md transition dark:bg-blue-gray-900 dark:hover:bg-blue-gray-700 dark:disabled:bg-blue-gray-800"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
