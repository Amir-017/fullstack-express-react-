// import React from "react";

// export default function sideBar  ({categoriesNameSideBar}){
//     return(
//         <div className="removeShadowBlack">
//         <React.Fragment>
//           <Drawer
        
//             open={open}
//             className="p-6 w-[75%] lg:w-[320px] overflow-y-auto bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 shadow-2xl"
//           >
//             <div className="mb-6 flex items-center justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
//               <div
//                 variant="h5"
//                 className="font-bold text-gray-800 dark:text-white"
//               >
//                 Side Menu
//               </div>
      
//               <IconButton
//                 variant="text"
//                 className="rounded-full hover:bg-gray-200  dark:hover:bg-gray-700 transition"
//                 onClick={closeDrawer}
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   strokeWidth={2}
//                   stroke="currentColor"
//                   className="h-5 w-5 bg-dark dark:bg-white rounded"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               </IconButton>
//             </div>
      
         
//               {categoriesNameSideBar.map((item)=>(
//                   <Typography
//                 as={Link}
//                 to={`/${item}`}
//                 variant="h6"
//                 className="px-3 py-2 rounded-lg transition duration-200 hover:bg-gray-100 dark:hover:bg-gray-800 hover:pl-4 dark:text-white"
//               >
//                 {item}
               
//               </Typography>
//               ))}
          
//             {/* </Typography> */}
//           </Drawer>
//         </React.Fragment>
//       </div>
//     )
// }