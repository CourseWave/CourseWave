import React from "react";
import Feature1 from "../Assets/Feature1.png";
import Feature2 from "../Assets/Feature2.png";
import Feature3 from "../Assets/Feature3.png";
import Feature4 from "../Assets/Feature4.png";
import ProfilePic from "../Assets/ProfilePic.jpg";
import heroSection from "../Assets/AboutUsImage.png";

const AboutUsPage = () => {
  return (
    <div className="mx-auto">
      <div className="bg-gray-800 h-[35rem] text-white flex flex-col">
        <div className="flex justify-center flex-col lg:px-40 mx-5 mt-36 ">
          <h1 className="text-4xl lg:text-6xl flex w-full lg:w-48">About</h1>
          <span className="text-[#00ffc2] sm:text-4xl md:text-5xl lg:text-7xl">
            CourseWave
          </span>
          <p className="w-full lg:w-96 mt-5">
            CourseWave platform is a unique blend of Udemy and Cambly, providing
            a dynamic learning experience for both "teachers" and learners.
            "Teachers" have the opportunity to offer courses and conduct live
            interactive sessions, while learners can browse and enroll in a
            diverse range of courses.
          </p>
          <img
            src={heroSection}
            alt="img"
            className="hidden lg:block lg:absolute lg:h-[37rem] lg:w-[37rem] right-[6rem] top-36 lg:top-[6.1rem]"
          />
        </div>
      </div>
      {/* Features under Images */}
      <div className="flex flex-col xl:flex-row xl:justify-between h-auto bg-[#00ffc2] xl:px-52 flex-wrap ">
        {/* Feature 1 */}
        <div className="flex flex-col items-center w-full xl:w-96 mb-8 lg:mb-5">
          <img src={Feature1} alt="Feature 1" className="w-60 h-60" />
          <h3 className="text-xl font-bold mb-2">
            Access For Unlimited Growth
          </h3>
          <p className="text-gray-600 sm:w-96">
            Unlock endless possibilities with our platform, offering unlimited
            access to a vast array of courses for your personal and professional
            growth. .
          </p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center w-full xl:w-96 mb-8 lg:mb-5 ">
          <img src={Feature2} alt="Feature 2" className="w-60 h-60" />
          <h3 className="text-xl font-bold mb-2">Expert Instructors</h3>
          <p className="text-gray-600 sm:w-96">
            Learn from industry experts and experienced instructors who are
            dedicated to helping you succeed in your learning journey.
          </p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center w-full xl:w-96 mb-8 lg:mb-5">
          <img src={Feature3} alt="Feature 3" className="w-60 h-60" />
          <h3 className="text-xl font-bold mb-2">Online Classes</h3>
          <p className="text-gray-600 sm:w-96">
            Enjoy the convenience of online classes, allowing you to learn
            anytime, anywhere, and at your own pace.
          </p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-center w-full xl:w-96 mb-8 lg:mb-5">
          <img src={Feature4} alt="Feature 4" className="w-60 h-60" />
          <h3 className="text-xl font-bold mb-2">
            Comment With other Students
          </h3>
          <p className="text-gray-600 sm:w-96">
            Just because you are learning online doesn’t mean you have to be all
            alone. With our discussion forum, you can share your opinions with
            other students and even make friends.
          </p>
        </div>
      </div>

      {/* Team Members */}
      <div className="my-8 flex justify-around flex-wrap">
        {/* Team Member 1 */}
        <div className="flex flex-col items-center mb-10">
          <img src={ProfilePic} alt="Team Member 1" className="h-32 mb-4" />
          <h3 className="text-xl font-bold mb-2">Laith Al Majali</h3>
          <p className="text-gray-600">Back-End Developer</p>
        </div>

        {/* Team Member 2 */}
        <div className="flex flex-col items-center mb-10">
          <img src={ProfilePic} alt="Team Member 2" className="h-32 mb-4" />
          <h3 className="text-xl font-bold mb-2">Haitham Al Zyoud</h3>
          <p className="text-gray-600">Front-End Developer</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
