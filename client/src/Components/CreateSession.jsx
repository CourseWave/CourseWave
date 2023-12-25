import { useDispatch } from "react-redux";
import { createLiveSession } from "../Redux/liveSessionsSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const CreateSession = ({ onSave }) => {
  const dispatch = useDispatch();

  function handleSubmit(e) {
    e.preventDefault();
    const isValid = e.target.checkValidity();

    if (!isValid) {
      return;
    }

    const values = Object.values(e.target)
      .filter((e) => e.value)
      .map((e) => e.value);

    const [title, date, time] = values;
    const result = {
      session_title: title,
      session_date: date,
      session_time: time,
    };
    try {
      dispatch(createLiveSession(result));
      toast.success(`Session created successfully`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      onSave(true);
    } catch (error) {
      console.log(error);
      toast.error(`${error} is missing`, {
        position: toast.POSITION.TOP_RIGHT,
      });
      onSave(false);
    }
  }
  return (
    <div className="container mx-auto p-8 bg-gray-100 rounded-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            name="title"
            className="mt-1 p-2 w-full border rounded-md"
            required
            autoComplete={"off"}
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="date"
            className="block text-sm font-medium text-gray-700"
          >
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="time"
            className="block text-sm font-medium text-gray-700"
          >
            Time
          </label>
          <input
            type="time"
            name="time"
            id="date"
            className="mt-1 p-2 w-full border rounded-md"
            required
          />
        </div>
        <div className="text-end">
          <button
            type="submit"
            className="bg-indigo-700 hover:bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
