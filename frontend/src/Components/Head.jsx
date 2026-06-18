import React, { useEffect, useState } from "react";
import {
  Navbar,
  Typography,
  IconButton,
  Button,
  Input,
  Collapse,
  Badge,
} from "@material-tailwind/react";
import { MdOutlineMenuOpen } from "react-icons/md";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { CiShoppingCart, CiSun } from "react-icons/ci";
import { FaRegMoon } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import api from "../Api/api";
const Head = ({
  openDrawer,
  setCheckSearch,
  checkSearch,
  categoriesNameSideBar,
}) => {
  /////////////// states ///////////////
  const [openNav, setOpenNav] = useState(false);
  const [darkLight, setDarkLight] = useState(false);
  const [userName, setUserName] = useState("");
  const [cart, setCart] = useState([]);
  const [cartQuantity, setCartQuantity] = useState(1);
  ////////////// variables //////////////
  const token = JSON.parse(localStorage.getItem("accessToken"));
  const counter = JSON.parse(localStorage.getItem("counter"));
  const decoded = token ? jwtDecode(token) : null;
  const navigate = useNavigate();
  const location = useLocation();

  ////////////// functions //////////////
  // close nav when window resize
  const handleWindowResize = () =>
    window.innerWidth >= 960 && setOpenNav(false);

  useEffect(() => {
    window.addEventListener("resize", handleWindowResize);
    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);
  // get user name from local storage
  useEffect(() => {
    setUserName(JSON.parse(localStorage.getItem("userName")));
  }, [JSON.parse(localStorage.getItem("userName"))]);
  // dark theme
  function setDarkTheme() {
    document.documentElement.classList.add("dark");
    localStorage.theme = "dark";
    setDarkLight(!darkLight);
    setOpenNav(false);
  }
  // light theme
  function setLightTheme() {
    document.documentElement.classList.remove("dark");
    localStorage.theme = "light";
    setDarkLight(!darkLight);
    setOpenNav(false);
  }
  // search function

  const searchProd = () => {
    navigate("/search");
    setOpenNav(false);
  };

  const getCart = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("accessToken"));
      const res = await api.get(`https://e-commerce-nodejs-blush.vercel.app/cart`, {
        headers: {
          authorization: token
        }
      });
      setCart(res.data.data);
    } catch (error) {
      console.error("Error fetching cart:", error);
      return null;
    }
  };
  // get cart when component mount (update cart quantity in header)
 useEffect(() => {
  const handleCartUpdate = () => {
    getCart();
  };

  window.addEventListener("cartUpdated", handleCartUpdate);

  return () => {
    window.removeEventListener("cartUpdated", handleCartUpdate);
  };
}, []);

 // get cart when user log in (update cart quantity in header)
useEffect(() => {
  if (localStorage.getItem("accessToken")) {
    getCart();
  }
}, []);
  // close nav when click on  any link or any interaction in header
  useEffect(() => {
    setOpenNav(false);
  }, [location.pathname]);

  return (

    <Navbar
      variant="gradient"
      color="blue-gray"
      className="sticky top-0 z-20 mx-auto max-w-screen-xl  from-green-900 to-green-800 dark:from-blue-gray-900 dark:to-blue-gray-800 px-4"
    >

      <div className="flex h-full w-full items-center justify-between text-white">
        <div className="flex items-center gap-1">
          <Button
            onClick={openDrawer}
            className="min-w-[32px] me-1 text-3xl text-white bg-transparent p-0"
            variant="text"
          >
            <MdOutlineMenuOpen />
          </Button>
          <Typography
            as={Link}
            to="/"
            href="#"
            className="flex items-center mr-4 cursor-pointer capitalize text-2xl lg:text-[2.2em] text-white hover:text-green-300 hover:dark:text-blue-gray-200"
          >
            Market
          </Typography>
        </div>

        {/* ///////////////////////////////////////////*/}
        <div className="hidden lg:flex flex-col w-full h-full gap-4">
          {/* ====== Search Input ====== */}
          <div className="w-full flex justify-center">
            <div className="w-full max-w-4xl relative">
              <Input
                onKeyUp={(e) => setCheckSearch(e.target.value)}
                type="search"
                color="white"
                label="Type here..."
                className="w-full pr-20"
              />
              <Button
                size="sm"
                className={`!absolute right-1 top-[.3rem] rounded bg-green-300 dark:bg-[#282d45]`}
                onClick={checkSearch ? searchProd : undefined}
                disabled={!checkSearch}
              >
                Search
              </Button>
            </div>
          </div>

          {/* ======  Links + Cart + Theme + Register ====== */}
          <div className="flex items-center justify-center gap-6 w-full">
            {/* Categories */}
            <ul className="flex items-center gap-7 overflow-x-auto no-scrollbar">
              {categoriesNameSideBar.map((item, i) =>
                item.length <= 9 ? (
                  <Typography
                    key={i}
                    as={Link}
                    to={`/${item}`}
                    variant="h6"
                    className="text-white hover:text-green-300 font-medium hover:dark:text-[#9b9ca5]"
                  >
                    {item}
                  </Typography>
                ) : null,
              )}
            </ul>

            {/* Cart */}
            <div className="relative group">
              <Badge
                content={userName ? cart?.reduce((total, item) => total + item.quantity, 0) : 0}
                className={cart && cart.length > 0 ? "bg-green-900" : "bg-red-900"}
              >
                <Link to="/adding">
                  <CiShoppingCart className="text-4xl text-white hover:text-green-300 hover:dark:text-[#9b9ca5]" />
                </Link>
              </Badge>
            </div>

            {/* Theme  */}
            <button
              onClick={darkLight ? setLightTheme : setDarkTheme}
              className="text-2xl text-white hover:text-green-300"
            >
              {darkLight ? <CiSun /> : <FaRegMoon />}
            </button>

            {/* Register  */}
            {userName ? (
              <div className="flex items-center gap-3">
                <h1 className="text-gray-300 dark:text-blue-gray-300 ps-1">
                  {userName}
                </h1>

                {/*  Profile Dropdown */}
                <div className="relative group">
                  <button className="flex items-center focus:outline-none">
                    <img
                      src="https://ui-avatars.com/api/?name=User&background=10b981&color=fff&rounded=true"
                      alt="profile"
                      className="w-9 h-9 rounded-full ring-2 ring-green-400 object-cover"
                    />
                  </button>

                  <div className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-blue-gray-800 rounded-lg shadow-lg overflow-y-auto h-auto max-h-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 rounded-t-lg text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-blue-gray-700 transition"
                    >
                      Profile
                    </Link>

                    {decoded?.role == "admin" ? (
                      <div className="">
                        <Link
                          to="/allUsers"
                          className="block px-4 py-2 rounded-t-lg text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-blue-gray-700 transition"
                        >
                          Users
                        </Link>
                        <Link
                          to="/allCarts"
                          className="block px-4 py-2 rounded-t-lg text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-blue-gray-700 transition"
                        >
                          Carts
                        </Link>
                        <Link
                          to="/adminDashboard"
                          className="block px-4 py-2 rounded-t-lg text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-blue-gray-700 transition"
                        >
                          admin Dashboard
                        </Link>

                        <Link
                          to="/reviewsManagement"
                          className="block px-4 py-2 rounded-t-lg text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-blue-gray-700 transition"
                        >
                          Reviews Management
                        </Link>
                        <Link
                          to="/allOrders"
                          className="block px-4 py-2 rounded-t-lg text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-blue-gray-700 transition"
                        >
                          All Orders
                        </Link>
                      </div>
                    ) : null}
                    <button
                      onClick={() => {
                        localStorage.removeItem("accessToken");
                        localStorage.removeItem("userName");
                        localStorage.removeItem("counter");

                        window.location.href = "/login";
                      }}
                      className="block px-4 py-2 w-full text-left rounded-b-lg text-red-600 hover:bg-gray-200 dark:hover:bg-blue-gray-700 transition"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <Link
                to="/login"
                className="ps-1 text-white font-weight hover:text-green-100 font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <XMarkIcon className="h-6 w-6" strokeWidth={2} />
          ) : (
            <Bars3Icon className="h-6 w-6" strokeWidth={2} />
          )}
        </IconButton>
      </div>
      <Collapse open={openNav}>
        <div className="mt-3 lg:hidden w-full rounded-xl bg-gradient-to-b from-green-900/90 to-green-800/90 dark:from-blue-gray-900/95 dark:to-blue-gray-800/95 px-4 py-4 shadow-lg">
          {/* Categories + user */}
          <div className="w-full">
            <ul className="flex flex-col gap-2 mb-4">
              {categoriesNameSideBar.map(
                (item, i) =>
                  item.length <= 9 && (
                    <Typography
                      key={i}
                      as={Link}
                      to={`/${item}`}
                      variant="small"
                      className="px-2 py-1 rounded-md text-white hover:text-green-300 hover:bg-white/5 font-medium hover:dark:text-[#9b9ca5] transition-colors"
                    >
                      {item}
                    </Typography>
                  ),
              )}

              {userName ? (
                <div className="mt-3 flex items-center justify-between rounded-md bg-black/10 px-3 py-2">
                  <h1 className="text-blue-300 dark:text-blue-gray-300  ps-1 text-sm font-semibold truncate">
                    {userName}
                  </h1>

                  <div className="relative  group">
                    <button className="flex items-center focus:outline-none">
                      <img
                        src="https://ui-avatars.com/api/?name=User&background=10b981&color=fff&rounded=true"
                        alt="profile"
                        className="w-9  rounded-full ring-2 ring-green-400  object-cover"
                      />
                    </button>

                    <div className="absolute right-0 top-full mt-2 w-36 bg-white dark:bg-blue-gray-800 rounded-lg shadow-lg overflow-y-auto h-auto max-h-48 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 rounded-t-lg text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-blue-gray-700 transition"
                      >
                        Profile
                      </Link>

                      {decoded?.role == "admin" ? (
                        <div className="">
                          <Link
                            to="/allUsers"
                            className="block px-4 py-2 rounded-t-lg text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-blue-gray-700 transition"
                          >
                            Users
                          </Link>
                          <Link
                            to="/allCarts"
                            className="block px-4 py-2 rounded-t-lg text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-blue-gray-700 transition"
                          >
                            Carts
                          </Link>
                          <Link
                            to="/adminDashboard"
                            className="block px-4 py-2 rounded-t-lg text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-blue-gray-700 transition"
                          >
                            admin Dashboard
                          </Link>

                          <Link
                            to="/reviewsManagement"
                            className="block px-4 py-2 rounded-t-lg text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-blue-gray-700 transition"
                          >
                            Reviews Management
                          </Link>

                          <Link
                            to="/allOrders"
                            className="block px-4 py-2 rounded-t-lg text-gray-700 dark:text-white hover:bg-gray-200 dark:hover:bg-blue-gray-700 transition"
                          >
                            All Orders
                          </Link>
                        </div>
                      ) : null}
                      <button
                        onClick={() => {
                          localStorage.removeItem("accessToken");
                          localStorage.removeItem("userName");
                          localStorage.removeItem("counter");
                          window.location.href = "/login";
                        }}
                        className="block px-4 pb-6 py-2 w-full text-left rounded-b-lg text-red-600 hover:bg-gray-200 dark:hover:bg-blue-gray-700 transition"
                      >
                        Logout
                      </button>
                    </div>
                  </div>


                </div>
              ) : (
                <Link
                  to="/login"
                  className="mt-2 inline-block px-2 py-1 text-sm rounded-md bg-white/5 text-white font-bold hover:text-green-300 font-medium"
                >
                  Login
                </Link>
              )}
            </ul>
          </div>

          {/* Theme + search + cart */}
          <div className="flex flex-col gap-4 w-full">
            {/* Theme toggle */}
            <div className="flex justify-start">
              {darkLight ? (
                <button
                  onClick={setLightTheme}
                  className="inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-2xl text-yellow-300 hover:bg-white/20 transition-colors"
                >
                  <CiSun />
                </button>
              ) : (
                <button
                  onClick={setDarkTheme}
                  className="inline-flex items-center justify-center rounded-full bg-white/10 p-2 text-2xl text-white hover:bg-white/20 transition-colors"
                >
                  <FaRegMoon />
                </button>
              )}
            </div>

            {/* Search */}
            <div className="w-full">
              <div className="relative flex items-center gap-2">
                <Input
                  onKeyUp={(e) => setCheckSearch(e.target.value)}
                  type="search"
                  color="white"
                  label="Type here..."
                  className="pr-20 h-[40px]"
                  containerProps={{ className: "min-w-0 w-full" }}
                />

                {checkSearch ? (
                  <Button
                    size="sm"
                    className="!absolute right-1 top-[.29rem] rounded bg-green-700 dark:bg-[#282d45]"
                    onClick={searchProd}
                  >
                    search
                  </Button>
                ) : (
                  <Button
                    size="sm"
                    className="!absolute right-1 top-[.29rem] rounded bg-green-700 dark:bg-[#282d45]"
                    disabled
                    onClick={searchProd}
                  >
                    search
                  </Button>
                )}
              </div>
            </div>

            {/* Cart */}
            <div className="relative flex justify-start pt-1">
              <div className="group inline-flex">
                <div
                  variant="small"
                  className="font-medium text-white cursor-pointer hover:dark:text-[#9b9ca5]"
                >
                  <Badge
                    content={userName ? cart?.reduce((total, item) => total + item.quantity, 0) : 0}
                    className={cart && cart.length > 0 ? "bg-green-900" : "bg-red-900"}
                  >
                    <Link to="/adding">
                      <CiShoppingCart className="text-3xl text-white hover:text-green-300" />
                    </Link>
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Collapse>
    </Navbar>


  );
};

export default Head;
