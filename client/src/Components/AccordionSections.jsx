// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {  fetchSections } from "../Redux/CoursesSlice";

// const AccordionSections = ({ id }) => {
//   const dispatch = useDispatch();

//   const sections = useSelector((state) => state.Courses.sections);

//   useEffect(() => {
//     const fetchCoursesList = async () => {
//       try {
//         await dispatch(fetchSections(id));
//       } catch (error) {
//         console.log("Error fetching data", error.message);
//       }
//     };

//     fetchCoursesList();
//   }, [dispatch, id]);

//   return (
//     <>
//       <div>
//         {sections?.map((section) => (
//           <div key={section.course_section_id}>
//             {" "}
//             <h2>{section.section_name}</h2>
//           </div>
//         ))}
//       </div>
//     </>
//   );
// };

// export default AccordionSections;


import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCourses, fetchSections } from "../Redux/CoursesSlice";
import { fetchSectionVideos } from "../Redux/CoursesSlice"; 
import VideoForm from "./VideoForm";

const AccordionSections = ({ id }) => {
  const dispatch = useDispatch();
  const sections = useSelector((state) => state.Courses.sections);

  const [selectedSection, setSelectedSection] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    const fetchSectionsList = async () => {
      try {
        await dispatch(fetchSections(id));
      } catch (error) {
        console.log("Error fetching data", error.message);
      }
    };

    fetchSectionsList();
  }, [dispatch, id]);

  const toggleAccordion = async (section) => {
    if (selectedSection === section) {
      setSelectedSection(null);
    } else {
      setSelectedSection(section);
      // Fetch videos for the selected section
      await dispatch(fetchSectionVideos(section.course_section_id));
    }
  };

  const handleAddVideoClick = (section) => {
    setSelectedSection(section);
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
  };

  return (
    <>
      <div>
        {sections?.map((section) => (
          <div key={section.course_section_id}>
            <h2 onClick={() => toggleAccordion(section)}>
              {section.section_name}
            </h2>
            {selectedSection === section && (
              <>
                {/* Button to add videos */}
                <button 
                className="border-2 px-2 rounded-sm"
                onClick={() => handleAddVideoClick(section)}>
                  Add Video
                </button>
                {/* Render videos in an accordion format */}
                <ul>
                  {section.videos &&
                    section.videos.map((video) => (
                      <li key={video.id}>{video.title}</li>
                    ))}
                </ul>
              </>
            )}
          </div>
        ))}
      </div>
      {isFormOpen && selectedSection && (
        // Render the VideoForm component
        <VideoForm
          courseId={id}
          sectionId={selectedSection.course_section_id}
          onClose={closeForm}
        />
      )}
    </>
  );
};

export default AccordionSections;
