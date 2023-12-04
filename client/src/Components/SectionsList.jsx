import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSections } from "../Redux/CoursesSlice";

const SectionsList = () => {
  const sections = useSelector((state) => state.Courses); // Update 'courses' with your actual slice name
  const [activeAccordion, setActiveAccordion] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

  const handleAccordionToggle = (index) => {
    setActiveAccordion((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <div id="accordion-collapse" data-accordion="collapse">
      {sections &&
      sections.map((section, index) => (
        <div key={index}>
          <h2
            id={`accordion-collapse-heading-${index}`}
            onClick={() => handleAccordionToggle(index)}
          >
            <button
              type="button"
              className={`flex items-center justify-between w-full p-5 font-medium rtl:text-right text-gray-500 border ${
                activeAccordion === index
                  ? "border-b-0 bg-gray-100 dark:bg-gray-800"
                  : "border-b-0"
              } border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3`}
              data-accordion-target={`#accordion-collapse-body-${index}`}
              aria-expanded={activeAccordion === index}
              aria-controls={`accordion-collapse-body-${index}`}
            >
              <span>{section.sectionName}</span>
              <svg
                data-accordion-icon
                className={`w-3 h-3 rotate-180 shrink-0 ${
                  activeAccordion === index && "rotate-0"
                }`}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9 5 5 1 1 5"
                />
              </svg>
            </button>
          </h2>
          <div
            id={`accordion-collapse-body-${index}`}
            className={`${activeAccordion === index ? "block" : "hidden"}`}
            aria-labelledby={`accordion-collapse-heading-${index}`}
          >
            <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
              {/* You can display additional information about the section here */}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SectionsList;
