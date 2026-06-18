import React, { useEffect, useState } from "react";
import img1 from "../imges/slider_img_1-aa711fe6.jpg";
import img2 from "../imges/slider_img_2-ad43ef2a.jpg";
import axios from "axios";

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Carousel,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
const AllProducts = ({ products, setProducts }) => {
  const [Loading, setLoading] = useState(false);
  setTimeout(() => {
    setLoading(true);
  }, 1300);


  return (
    <div className="w-full  ">
      <Carousel className="rounded-xl container mx-auto my-10" loop={true}>
        <img src={img1} alt="image 1" className="h-[40%] w-full object-cover" />
        <img src={img2} alt="image 2" className="h-[40%] w-full object-cover" />
        <img src={img1} alt="image 3" className="h-[40%] w-full object-cover" />
      </Carousel>

      <div className=" w-full dark:bg-blue-gray-900 bg-[#EAEAEA]">
        <div className="container mx-auto">
          <div className="w-full h-40 pt-[2em]">
            <div className="w-full dark:bg-blue-gray-800 bg-[#EAEAEA]  h-20  rounded-xl flex shadow-lg mb-20  items-center  ">
              <div className="w-1 h-20  dark:bg-black bg-green-500 rounded"></div>
              <h1 className="dark:text-white text-gray-500 text-2xl ms-3  font-bold">
                SEE OUR PRODUCTS
              </h1>
            </div>
          </div>
          {Loading ? (
            <div className="w-full grid grid-cols-1 gap-4 justify-items-center items-center md:grid-cols-3 lg:grid-cols-4">
              {products.map((prod, i) => (
                <div className="" key={i}>
                  <Card className="mt-10 border border-gray-300 dark:border-blue-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-xl overflow-hidden bg-white dark:bg-blue-gray-900">

                    {/* HEADER */}
                    <CardHeader className="h-96 bg-transparent dark:bg-transparent">

                      <div className="py-3">

                        <h1 className="w-28 h-14 text-center pt-3 rounded-lg font-bold shadow-md
                        bg-gradient-to-r from-green-500 to-green-700
                        dark:from-blue-gray-700 dark:to-blue-gray-800
                        text-white"
                        >
                          {prod.category}
                        </h1>

                        {prod.images.slice(-1).map((im, it) => (
                          <img
                            key={it}
                            src={im}
                            className="w-full h-56 object-cover rounded-lg mt-3 transition-transform duration-300 hover:scale-105"
                          />
                        ))}

                      </div>

                    </CardHeader>

                    {/* BODY (same bg as card) */}
                    <CardBody className="bg-transparent dark:bg-transparent p-5">

                      <Typography
                        variant="h5"
                        className="mb-2 font-bold text-center text-blue-gray-800 dark:text-white"
                      >
                        Brand:{" "}
                        <span className="text-green-600 dark:text-blue-gray-300 font-medium">
                          {prod.brand
                            ? prod.brand
                            : prod.tags
                              ? prod.tags.map((im) => im).join(", ")
                              : "UNKNOWN"}
                        </span>
                      </Typography>

                      <hr className="my-2 border-t border-gray-300 dark:border-blue-gray-700" />

                      <Typography className="text-gray-700 dark:text-blue-gray-200 text-center text-lg font-semibold">
                        {prod.title}
                      </Typography>

                      <Typography className="text-black dark:text-white text-center font-bold mt-3">
                        Price:{" "}
                        <span className="text-green-600 dark:text-blue-gray-300 font-medium">
                          ${prod.price}
                        </span>
                      </Typography>

                    </CardBody>

                    {/* FOOTER (same bg as card) */}
                    <CardFooter className="bg-transparent dark:bg-transparent pt-4 w-full">

                      <Link to={`/details/${prod._id}`}>
                        <Button
                          className="w-full flex justify-center items-center font-bold text-sm rounded-lg px-4 py-2
                           bg-gradient-to-r from-green-700 to-yellow-700
                           hover:from-green-800 hover:to-yellow-800
                          dark:from-blue-gray-700 dark:to-blue-gray-800
                          dark:hover:from-blue-gray-800 dark:hover:to-blue-gray-900
                          text-white transition-all duration-300"
                        >
                          Show Details
                        </Button>
                      </Link>

                    </CardFooter>

                  </Card>
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full h-[80vh] dark:bg-blue-gray-900 bg-gray-200 flex justify-center items-center ">
              <div className="loader"></div>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-y-8 dark:bg-blue-gray-900 bg-gray-200">
        <div className="container mx-auto">
          <div className="w-full h-40 pt-[2em]">
            <div className="w-full dark:bg-blue-gray-800 bg-[#EAEAEA]  h-20  rounded-xl flex shadow-lg mb-20  items-center  ">
              <div className="w-1 h-20 dark:bg-black bg-green-500 rounded"></div>
              <h1 className="text-gray-500  text-2xl ms-3  font-bold  dark:text-white ">
                SEE OUR Beauty
              </h1>
            </div>
          </div>{" "}
          <div className="w-full h-40 pt-[2em]">
            <div className="w-full dark:bg-blue-gray-800 bg-[#EAEAEA]  h-20  rounded-xl flex shadow-lg mb-20  items-center  ">
              <div className="w-1 h-20 dark:bg-black bg-green-500 rounded"></div>
              <h1 className="text-gray-500 text-2xl ms-3  font-bold  dark:text-white ">
                SEE OUR Fragrances
              </h1>
            </div>
          </div>{" "}
          <div className="w-full h-40 pt-[2em]">
            <div className="w-full dark:bg-blue-gray-800 bg-[#EAEAEA]  h-20  rounded-xl flex shadow-lg mb-20  items-center  ">
              <div className="w-1 h-20 dark:bg-black bg-green-500 rounded"></div>
              <h1 className="text-gray-500 text-2xl ms-3  font-bold  dark:text-white ">
                SEE OUR Furniture
              </h1>
            </div>
          </div>{" "}
          <div className="w-full h-40 pt-[2em]">
            <div className="w-full dark:bg-blue-gray-800 bg-[#EAEAEA]  h-20  rounded-xl flex shadow-lg mb-20  items-center  ">
              <div className="w-1 h-20 dark:bg-black bg-green-500 rounded"></div>
              <h1 className="text-gray-500 text-2xl ms-3  font-bold  dark:text-white ">
                SEE OUR Groceries
              </h1>
            </div>
          </div>{" "}
          <div className="w-full h-40 pt-[2em]">
            <div className="w-full dark:bg-blue-gray-800 bg-[#EAEAEA]  h-20  rounded-xl flex shadow-lg mb-20  items-center  ">
              <div className="w-1 h-20 dark:bg-black bg-green-500 rounded"></div>
              <h1 className="text-gray-500 text-2xl ms-3  font-bold  dark:text-white ">
                SEE OUR Home Decoration
              </h1>
            </div>
          </div>{" "}
          <div className="w-full h-40 pt-[2em]">
            <div className="w-full dark:bg-blue-gray-800 bg-[#EAEAEA]  h-20  rounded-xl flex shadow-lg mb-20  items-center  ">
              <div className="w-1 h-20 dark:bg-black bg-green-500 rounded"></div>
              <h1 className="text-gray-500 text-2xl ms-3  font-bold  dark:text-white ">
                SEE OUR Accessories
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProducts;
