import React from "react";
import { Typography } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="px-10 dark:bg-blue-gray-900 bg-green-900 flex w-full flex-row  items-center justify-center gap-y-6 gap-x-12 border-t border-blue-gray-50 py-6 text-center md:justify-between">
      <Typography color="blue-gray" className="font-bold text-white">
        &copy; 2026 MARKET
      </Typography>
      <ul className="flex flex-wrap items-center gap-y-2 gap-x-8 ">
        <li>
          <Typography className="font-bold cursor-pointer text-white transition-colors hover:text-green-500 focus:text-green-500 hover:dark:text-[#9b9ca5]">
            About Us
          </Typography>
        </li>
        <li>
          <Typography className="font-bold text-white transition-colors cursor-pointer hover:text-green-500 focus:text-green-500 hover:dark:text-[#9b9ca5]">
            License
          </Typography>
        </li>
        <li>
          <Typography className="font-bold text-white transition-colors cursor-pointer hover:text-green-500 focus:text-green-500 hover:dark:text-[#9b9ca5]">
            Contribute
          </Typography>
        </li>
        <li>
          <Typography className="font-bold text-white transition-colors cursor-pointer hover:text-green-500 focus:text-green-500 hover:dark:text-[#9b9ca5]">
            Contact Us
          </Typography>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
