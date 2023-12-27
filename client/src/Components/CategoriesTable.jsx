import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../Redux/CategoriesSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Modal } from "./modal";

const CategoriesTable = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.Categories.categories);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");
  const [isEditMode, setIsEditMode] = useState(false);
  const [editObject, setEditObject] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEdit = (category) => {
    setIsEditMode(true);
    setNewCategoryTitle(category.category_name);
    setEditObject(category);
    setIsModalOpen(true);
  };

  const handleDelete = (categoryId) => {
    dispatch(deleteCategory(categoryId));
    toast.success("Category Deleted Successfully", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const resetForm = () => {
    setNewCategoryTitle("");
    setEditObject({});
    setIsEditMode(false);
    setIsModalOpen(false);
  };

  const handleAddCategory = () => {
    // Add logic to dispatch an action to create a new category
    if (newCategoryTitle.trim() !== "") {
      if (isEditMode) {
        try {
          dispatch(
            updateCategory({
              categoryId: editObject.category_id,
              category_name: newCategoryTitle,
            })
          );

          toast.success("Category Updated Successfully", {
            position: toast.POSITION.TOP_RIGHT,
          });
        } catch (error) {
          toast.error(error, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        resetForm();
        return;
      }
      dispatch(createCategory({ category_name: newCategoryTitle }));
      toast.success("Category Created Successfully", {
        position: toast.POSITION.TOP_RIGHT,
      });
      setNewCategoryTitle(""); // Clear input after adding
      setIsModalOpen(false);
    }
  };

  return (
    <div className="p-2">
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          title={
            isEditMode ? "Edit " + editObject?.category_name : "Add Category"
          }
          onClose={() => {
            setIsModalOpen(false);
          }}
        >
          <div className="flex my-4 overflow-hidden gap-4 justify-between flex-col mb-4 p-6 bg-gray-200 rounded-lg shadow-lg border">
            <label className="block text-md font-medium text-black">
              Category Title
            </label>
            <input
              type="text"
              placeholder="Category Title"
              value={newCategoryTitle}
              onChange={(e) => setNewCategoryTitle(e.target.value)}
              className="ring-0 outline-none border-[#1e293b] border p-2 w-full  rounded-md h-full"
            />
            <div className="text-end">
              <button
                className="text-white bg-[#1e293b] rounded-lg px-4 py-2 disabled:opacity-20"
                onClick={() => {
                  handleAddCategory();
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </Modal>
      )}

      <div className="flex mb-2 overflow-hidden gap-4 items-center justify-between">
        <h3 className="text-2xl font-semibold">Categories List</h3>
        <button
          className="text-white bg-[#1e293b] rounded-lg px-4 py-2 disabled:opacity-20"
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          Add
        </button>
      </div>

      <div className="text-gray-400 max-h-[22rem] overflow-y-auto rounded shadow-md">
        <table className="w-full text-sm text-left rounded">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
              <th scope="col" className="px-6 py-3">
                Title
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          {categories.length === 0 && (
            <p className="text-2xl text-black w-full">
              No Categories Available
            </p>
          )}
          <tbody>
            {categories
              ?.filter((e) => !!e)
              .sort((a, b) => a.category_id - b.category_id)
              .map((category) => (
                <tr
                  key={category?.category_id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                >
                  <td className="px-6 py-4">{category?.category_id}</td>
                  <td className="px-6 py-4">{category?.category_name}</td>
                  <td className="px-6 py-4">
                    <div className="flex gap-5">
                      <button
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                        onClick={() => handleEdit(category)}
                      >
                        Edit
                      </button>
                      <button
                        className="font-medium text-red-700 hover:underline"
                        onClick={() => handleDelete(category?.category_id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CategoriesTable;
