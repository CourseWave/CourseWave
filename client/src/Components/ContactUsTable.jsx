import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteMessage } from "../Redux/ContactUsSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const ContactUsTable = () => {
  const dispatch = useDispatch();
  const messages = useSelector((state) => state.contactUs?.messages);

  const handleDelete = async (messageId) => {
    try {
      dispatch(deleteMessage(messageId));
      toast.success("Message Deleted Successfully");
    } catch (error) {
      toast.error(error);
      console.error("Error deleting Message:", error);
    }
  };

  return (
    <div className="p-2">
      <div className="flex mb-2 overflow-hidden gap-4 items-center justify-between">
        <h3 className="text-2xl font-semibold">Contact Us Messages</h3>
      </div>

      <div className="text-gray-400 max-h-[22rem] overflow-y-auto rounded shadow-md">
        <table className="w-full text-sm text-left rounded">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Author
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Message Content
              </th>
              <th scope="col" className="px-6 py-3 text-center">
                Action
              </th>
            </tr>
          </thead>
          {messages.length === 0 && (
            <p className="text-2xl text-black w-full">No Messages Available</p>
          )}
          <tbody>
            {messages?.map((message) => (
              <tr
                key={message.message_id}
                className="border-b bg-gray-800 border-gray-700"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium whitespace-nowrap text-white"
                >
                  {message.message_author}
                </th>
                <td className="px-6 py-4 text-white">{message.author_email}</td>
                <td className="px-6 py-4 text-white">
                  {message.message_content}
                </td>

                <td className="flex px-6 py-4 space-x-2 justify-center text-white">
                  <button
                    className="font-medium text-red-600 dark:text-red-500 hover:underline"
                    onClick={() => {
                      handleDelete(message.message_id);
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactUsTable;
