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
import { Link } from "react-router-dom";
const MensWatches = () => {
  const [watches, setWatches] = useState([]);
  const [Loading, setLoading] = useState(false);
  setTimeout(() => {
    setLoading(true);
  }, 1300);
  const getMensWatches = () => {
    axios({
      method: "get",
      url: "https://e-commerce-nodejs-blush.vercel.app/products/category/mens-watches",
    }).then((data) => setWatches(data.data.products));
  };

  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    window.scrollTo(0, 0);
    getMensWatches();
  }, []);

  return (
    <div className="w-full  ">
      {Loading ? (
        <div className="w-full dark:bg-blue-gray-900 bg-[#EAEAEA]">
          <div className="container mx-auto">
            <div className="w-full h-40 pt-[2em]">
              <div className="w-full dark:bg-blue-gray-800 bg-[#EAEAEA]  h-20  rounded-xl flex shadow-lg mb-20  items-center  ">
                <div className="w-1 h-20 dark:bg-black bg-green-500 rounded"></div>
                <h1 className="text-gray-500  text-2xl ms-3  font-bold  dark:text-white ">
                  SEE OUR Mens Watches
                </h1>
              </div>
            </div>

            <div className="w-full grid grid-cols-1 gap-4 justify-items-center items-center md:grid-cols-3 lg:grid-cols-4 pb-10">
              {watches.map((prod, i) => (
              <div className="" key={i}>
                             <Card className="mt-10 border-[1px] border-gray-300 shadow-lg hover:shadow-2xl hover:shadow-black dark:hover:shadow-white transition-shadow duration-300 rounded-lg overflow-hidden dark:bg-blue-gray-800 bg-gray-50">
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
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full h-[80vh] dark:bg-blue-gray-900 bg-[#EAEAEA] flex justify-center items-center ">
          {/* <Spinner color="green" className="w-16 h-16 " /> */}
          <div className="loader"></div>
        </div>
      )}
    </div>
  );
};

export default MensWatches;
