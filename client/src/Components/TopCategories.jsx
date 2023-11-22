// TopCategories.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Redux/CategoriesSlice";
import { useNavigate } from "react-router-dom";

const TopCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Categories.categories);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = () => {
    navigate('/CategoryPage');
  };

  return (
    <div className="container mx-auto mt-8 mb-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Top Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
        {categories &&
          categories.map((category) => (
            <div
              key={category.id}
              className="bg-white p-4 rounded-lg shadow-md"
              onClick={() => handleCategoryClick(category)}
            >
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-32 object-cover mb-4 rounded-md"
              />
              <h3 className="text-xl font-bold mb-2">{category.title}</h3>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TopCategories;
