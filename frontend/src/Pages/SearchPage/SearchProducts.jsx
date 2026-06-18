import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../Api/api";
const SearchProducts = ({ checkSearch }) => {
  const [search, setSearch] = useState([]);
  const [Loading, setLoading] = useState(false);
  const searchItem = () => {
    api({
      method: "get",
      url: `https://e-commerce-nodejs-blush.vercel.app/products/?search=${checkSearch}`,
    }).then((data) => setSearch(data.data));
  };


  let findforwardPage = (numofPage) => {

    api({
      method: "get",
      url: `https://e-commerce-nodejs-blush.vercel.app/products/?search=${checkSearch}&page=${+numofPage + 1}`,
    }).then((data) => setSearch(data.data));
  };

  let findbackwardPage = (numofPage) => {
    api({
      method: "get",
      url: `https://e-commerce-nodejs-blush.vercel.app/products/?search=${checkSearch}&page=${+numofPage - 1}`,
    }).then((data) => setSearch(data.data));
  };

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
    const timer = setTimeout(() => {
      setLoading(true);
    }, 1300);

    searchItem();
    // findforwardPage()
    // findbackwardPage()

    if (!checkSearch) {
      navigate("/");
    }

    return () => clearTimeout(timer);
  }, [checkSearch]);
  const navigate = useNavigate();
  console.log(search);
  const back = () => {
    navigate("/");
  };



  //  useEffect(()=>{

  //   },[])
  return (
    <div className="w-full   ">
      {Loading ? (
        <div className="w-full dark:bg-blue-gray-900 bg-[#EAEAEA] min-h-screen">
          <div className="container mx-auto">
            <div className="w-full h-40 pt-[2em]">
              <div className="w-full dark:bg-blue-gray-800 bg-[#EAEAEA]  h-20  rounded-xl flex flex-col md:flex-row shadow-lg mb-20  justify-between  ">
                <div className="flex ">
                  <div className="w-1 h-20 bg-green-500 rounded"></div>
                  <h1 className="text-gray-700 dark:text-white text-2xl ms-3  font-bold h-20 flex items-center">
                    Search Products : {"  "}
                    <span className="ms-2 text-green-900 dark:text-green-300 font-bold">
                      {search.products && search.products.length > 0 ? search.products.length : "No Products found"}
                    </span>
                  </h1>
                </div>
                <div className=" h-20 flex">
                  <Button
                    variant="text"
                    className="flex items-center gap-2 dark:text-white"
                    onClick={back}
                  >
                    Back To Main{" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="h-5 w-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
            <div className="w-full flex justify-center mb-6">
              <div className="flex items-center gap-3 px-6 py-4 rounded-2xl bg-white dark:bg-blue-gray-800 border border-gray-200 dark:border-blue-gray-700 shadow-lg">

                <span className="text-2xl">📦</span>

                <div className="flex gap-2 justify-center items-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Products</p>
                  <h2 className="text-2xl font-bold text-green-600 dark:text-blue-gray-400 underline">
                    {search.products.length * search.totalPages}
                  </h2>
                </div>

              </div>
            </div>
            <div className="">

              {search.products.length > 0 ? (
                <div className="w-full grid  grid-cols-1 gap-4  md:grid-cols-3 lg:grid-cols-4 pb-10">
                  {search.products.map((prod, i) => (
                    <div className="w-full flex justify-center items-center" key={i}>
                      <Card className="  mt-10 border-[1px] border-gray-300 shadow-lg hover:shadow-2xl hover:shadow-black dark:hover:shadow-white transition-shadow duration-300 rounded-lg overflow-hidden dark:bg-blue-gray-800 bg-gray-50">
                        <CardHeader color="" className="relative h-96 dark:bg-blue-gray-800 bg-gray-50">
                          <div className="py-3 ">
                            <h1 className="bg-gradient-to-r from-green-500 to-green-700 dark:from-blue-gray-700 dark:to-blue-gray-900 w-28 h-14 text-center pt-3 text-white rounded-lg font-bold shadow-md">
                              {prod.category}
                            </h1>

                            {prod.images.slice(-1).map((image, index) => (
                              <img
                                alt="card-image"
                                src={image}
                                key={index}
                                className="w-full h-56 object-cover rounded-lg mt-3 transition-transform duration-300 hover:scale-105 "
                              />
                            ))}
                          </div>
                        </CardHeader>

                        <CardBody className="bg-gray-50 dark:bg-blue-gray-800 p-5">
                          <Typography
                            variant="h5"
                            color="blue-gray"
                            className="mb-2 font-bold text-center dark:text-white"
                          >
                            Brand:{" "}
                            <span className="text-green-600 dark:text-blue-gray-400 font-medium">
                              {prod.brand
                                ? prod.brand
                                : prod.tags
                                  ? prod.tags.map((im) => im).join(", ")
                                  : "UNKNOWN"}
                            </span>
                          </Typography>
                          <hr className="my-2 border-t-2 border-gray-300" />
                          <Typography className="text-gray-700 text-center dark:text-gray-300 text-lg font-semibold">
                            {prod.title}
                          </Typography>
                          <Typography className="text-black text-center font-bold mt-3 dark:text-white">
                            Price:{" "}
                            <span className="text-green-600 dark:text-blue-gray-400 underline font-medium">
                              ${prod.price}
                            </span>
                          </Typography>
                        </CardBody>

                        <CardFooter className="pt-4 w-full bg-gray-50 dark:bg-blue-gray-800">
                          <Link to={`/details/${prod._id}`}>
                            <Button
                              className="capitalize w-full flex justify-center items-center hover:shadow-lg font-bold text-sm border-[1px] border-gray-300 rounded-lg px-4 py-2 bg-gradient-to-r from-green-700 to-yellow-700 text-white hover:from-green-800 hover:to-yellow-800 dark:from-gray-800 dark:to-gray-900 dark:hover:from-gray-900 dark:hover:to-gray-800 transition-all duration-300"
                              variant="filled"
                            >
                              Show Details
                            </Button>
                          </Link>
                        </CardFooter>
                      </Card>


                    </div>

                  ))}</div>

              ) : (
                <div className="w-full  flex justify-center items-center  px-4">
                  <div className="max-w-xl w-full rounded-3xl bg-white dark:bg-blue-gray-900 shadow-2xl border border-gray-200 dark:border-blue-gray-700 p-10 text-center">
                    <div className="text-6xl mb-4">🔍</div>

                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-3">
                      No Products Found
                    </h2>

                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                      We couldn't find any products matching
                    </p>

                    <div className="mt-4 inline-block px-5 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 font-semibold break-all">
                      "{checkSearch}"
                    </div>

                    <p className="mt-6 text-sm text-gray-500 dark:text-gray-500">
                      Try searching with a different keyword or check the spelling.
                    </p>
                  </div>
                </div>
              )}

            </div>
            {/* /////////////////////////////////////// */}
            {/* Pagination Controls */}
            {/* /////////////////////////////////////// */}

            {search.totalPages > 1 && (
              <div className="w-full flex justify-center mt-10 mb-6">
                <div className="flex items-center gap-6 px-6 py-3 rounded-xl border border-gray-300 dark:border-gray-700 bg-white/70 dark:bg-blue-gray-900 shadow-md backdrop-blur-sm">

                  <Button
                    size="sm"
                    variant="outlined"
                    color="blue-gray"
                    onClick={() => findbackwardPage(search.page)}
                    disabled={search.page <= 1}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    Backward
                  </Button>

                  <div className="px-4 py-1 rounded-lg bg-gray-100 dark:bg-blue-gray-800 font-bold text-lg dark:text-white shadow-inner">
                    {search.page} / {search.totalPages}
                  </div>

                  <Button
                    size="sm"
                    variant="outlined"
                    color="blue-gray"
                    onClick={() => findforwardPage(search.page)}
                    disabled={search.page >= search.totalPages}
                    className="hover:scale-105 transition-transform duration-200"
                  >
                    Forward
                  </Button>

                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-screen  dark:bg-blue-gray-900 bg-[#EAEAEA] flex justify-center items-center ">
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default SearchProducts;
