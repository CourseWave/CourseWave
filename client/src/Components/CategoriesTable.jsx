// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchCategories } from "../Redux/CategoriesSlice";

// const CategoriesTable = () => {
//   const dispatch = useDispatch();
//   const categories = useSelector((state) => state.Categories.categories);
  
//   useEffect(() => {
//     dispatch(fetchCategories());
//   }, [dispatch]);

//   // Check if categories is undefined or if status is not available
//   if (!categories || !categories.status) {
//     console.log(categories);
//     return <p>Loading...</p>; // You can customize the loading message
   
// }

//   return (
//     <div>
//       <h2>Categories Table</h2>
//       {categories.status === "loading" && <p>Loading...</p>}
//       {categories.status === "failed" && (
//         <p>Error: {categories.error}</p>
//       )}
//       {categories.status === "succeeded" && (
//         <ul>
//           {categories.categories.map((category) => (
//             <li key={category.id}>{category.name}</li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// };

// export default CategoriesTable;
// const CategoriesTable = () => {
//     const dispatch = useDispatch();
//     const categories = useSelector((state) => state.Categories.categories);
  
//     useEffect(() => {
//       dispatch(fetchCategories());
//     }, [dispatch]);
  
//     // // Check if categories is undefined or if status is not available
//     // if (!categories || !categories.status) {
//     //   console.log(categories);
//     //   return <p>Loading...</p>; // You can customize the loading message
//     // }
  
//     return (
//       <div>
//         <h2>Categories Table</h2>
//         {categories.status === "loading" && <p>Loading...</p>}
//         {categories.status === "failed" && (
//           <p>Error: {categories.error}</p>
//         )}
//         {categories.status === "succeeded" && (
//           <div>
//             {/* Log categories for debugging */}
//             {categories.map((category) => {
//               console.log("Category:", category);
//               return (
//                 <div
//                   key={category.id}
//                   className="bg-white p-4 rounded-lg shadow-md"
//                   onClick={() => handleCategoryClick(category)}
//                 >
//                   <h3 className="text-xl font-bold mb-2">{category.title}</h3>
//                   <h3 className="text-xl font-bold mb-2">{category.tagline}</h3>

//                 </div>
//               );
//             })}
//           </div>
//         )}
//       </div>
//     );
//   };
  
//   export default CategoriesTable;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Redux/CategoriesSlice";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Categories.categories);

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleEdit = (category) => {
    // Add logic for editing the category
    console.log(`Editing category with ID: ${category.id}`);
  };

  const handleDelete = (categoryId) => {
    // Add logic for deleting the category
    console.log(`Deleting category with ID: ${categoryId}`);
  };

  return (
    <div>
      <h2>Categories Table</h2>
      {categories && categories.length === 0 && <p>No categories found.</p>}
      {categories && categories.length > 0 && (
        <table className="table border-2 border-black w-[30rem]">
          <thead className="border-2 border-black">
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="border-2 border-black">
            {categories.map((category) => (
              <tr key={category.id}>
                <td>{category.id}</td>
                <td>{category.title}</td>
                <td>
                  {/* Add your action buttons or links here */}
                  {/* Example: */}
                  <div className="flex gap-5">
                  <button className="bg-green-500 p-2 rounded-lg text-white" onClick={() => handleEdit(category)}>Edit</button>
                  <button  className=" bg-red-700 p-2 rounded-lg text-white" onClick={() => handleDelete(category.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default CategoriesTable;



