// TopCategories.jsx
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../Redux/CategoriesSlice";
import { useNavigate } from "react-router-dom";
import devImage from "../Assets/development_category.png";
import designImage from "../Assets/design_category.png";
import selfDevImage from "../Assets/self_category.png";

const images = [devImage, designImage, selfDevImage];

const TopCategories = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Categories.categories);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleCategoryClick = () => {
    navigate("/CategoryPage");
  };

  return (
    <div className="container mx-auto mt-8 mb-8">
      <h2 className="text-3xl font-bold mb-4 text-center">Top Categories</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8 mx-12">
        {categories &&
          categories
            ?.filter((e) => !!e)
            ?.sort((a, b) => a.category_id - b.category_id)
            ?.splice(0, 3)
            ?.map((category) => (
              <div
                key={category.category_id}
                className="bg-white rounded-lg shadow-md text-black cursor-pointer pb-2 hover:scale-110 transition-all delay-100"
                onClick={() => handleCategoryClick(category)}
              >
                <img
                  src={images[parseInt(category.category_id) - 1]}
                  alt={category.category_name}
                  className="w-full h-32 object-cover mb-4 rounded-md"
                />

                <h3 className="text-xl text-center font-bold mb-2">
                  {category.category_name}
                </h3>
              </div>
            ))}
      </div>
    </div>
  );
};

export default TopCategories;
