import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const TeacherStatistics = ({ teacherObject }) => {
  const [purchasedCourseCount, setPurchasedCourseCount] = useState(0);
  const [enrolledCount, setEnrolledCount] = useState(0);
  const purchasedCourses = useSelector(
    (state) => state.checkout.allPurchasedCourses
  );
  const courses = useSelector((state) => state.Courses.Courses);

  function getNumberOfStudentsByTrainer(trainerId) {
    const uniqueStudents = new Set();

    purchasedCourses.forEach((purchase) => {
      purchase.purchased_courses.forEach((courseId) => {
        const course = courses.find((c) => c.course_id === courseId);

        if (course && course.trainer_id === trainerId) {
          uniqueStudents.add(purchase.user_id);
        }
      });
    });

    return uniqueStudents.size;
  }

  function getPurchasedCoursesCountByTrainerId(trainerId) {
    let count = 0;

    purchasedCourses.forEach((purchase) => {
      purchase.purchased_courses.forEach((courseId) => {
        const course = courses.find((c) => c.course_id === courseId);
        if (course && course.trainer_id === trainerId) {
          count++;
        }
      });
    });

    return count;
  }

  useEffect(() => {
    if (!courses.length && !purchasedCourses.length) return;
    setPurchasedCourseCount(
      getPurchasedCoursesCountByTrainerId(teacherObject.trainer_id)
    );
    setEnrolledCount(getNumberOfStudentsByTrainer(teacherObject.trainer_id));
  }, [purchasedCourses, courses]);

  return (
    <div className="flex mb-2 overflow-hidden gap-4 items-center justify-center flex-wrap">
      <StatisticsCard label="Number Of Courses" value={courses?.length} />
      <StatisticsCard
        label="Number Of Purchased Courses"
        value={purchasedCourseCount}
      />
      <StatisticsCard
        label="Number Of Students enrolled"
        value={enrolledCount}
      />
    </div>
  );
};

const AnimatedWaveSvg = () => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width="100%"
      height="100%"
      viewBox="0 0 1600 900"
    >
      <linearGradient id="bg" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(53, 127, 242, 0.6)" stopOpacity="1" />
        <stop
          offset="100%"
          stopColor="rgba(38, 89, 190, 0.06)"
          stopOpacity="1"
        />
      </linearGradient>
      <path
        id="wave"
        fill="url(#bg)"
        d="M-363.852,502.589c0,0,236.988-41.997,505.475,0
  s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v560.106H-363.852V502.589z"
      />
      <g>
        <use xlinkHref="#wave" opacity=".3">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            dur="8s"
            calcMode="spline"
            values="270 230; -334 180; 270 230"
            keyTimes="0; .5; 1"
            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
            repeatCount="indefinite"
          />
        </use>
        <use xlinkHref="#wave" opacity=".6">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            dur="6s"
            calcMode="spline"
            values="-270 230;243 220;-270 230"
            keyTimes="0; .6; 1"
            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
            repeatCount="indefinite"
          />
        </use>
        {/* ... (similar <use> elements for other animations) */}
        <use xlinkHref="#wave" opacity=".9">
          <animateTransform
            attributeName="transform"
            attributeType="XML"
            type="translate"
            dur="4s"
            calcMode="spline"
            values="0 230;-140 200;0 230"
            keyTimes="0; .4; 1"
            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
            repeatCount="indefinite"
          />
        </use>
      </g>
    </svg>
  );
};

export const StatisticsCard = ({ label, value }) => {
  return (
    <div className="max-w-[20rem] w-72 px-2 font-['Euclid Circular A', 'Poppins']">
      <div className="rounded-lg shadow-md border mb-4 relative overflow-hidden">
        <div className="animated-wave-svg-wrapper">{AnimatedWaveSvg()}</div>
        <div className="rounded-lg bg-white shadow-lg  relative overflow-hidden">
          <div className="px-3 pt-8 pb-4 text-center relative z-10">
            <h4 className="text-sm uppercase text-gray-500 leading-tight">
              {label}
            </h4>
            <h3 className="text-3xl text-gray-700 font-semibold leading-tight my-3">
              {value}
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
