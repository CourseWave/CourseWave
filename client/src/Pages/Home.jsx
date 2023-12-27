import HeroSection from "../Components/HeroSection";
import StatisticsHome from "../Components/StatisticsHome";
import LatestCourses from "../Components/LatestCourses";
import WhyChooseUs from "../Components/WhyChooseUs";
import TopCategories from "../Components/TopCategories";
import Footer from "../Components/Footer";
import { Link } from "react-router-dom";
import BecomeTeacher from '../Assets/BecomeTeacher.png'
const Home = () => {
  return (
    <>
      <HeroSection />
      <StatisticsHome />
      <WhyChooseUs />
      <LatestCourses />
      <TopCategories />
      <div className="flex items-center justify-center my-20 mb-0 bg-gray-900 gap-5 py-4 flex-wrap">
        <img
          src={BecomeTeacher}
          alt=""
          className=""
        />
        <div className="flex flex-col w-56 text-white m-5">
          <h3 className="text-4xl font-bold text-white">
            Become An Instructor
          </h3>
          <p>
            Instructors from around the world teach millions of learners on{" "}
            <span className="text-[#00ffc2]">CourseWave</span>. We provide the
            tools and skills to teach what you love.
          </p>
          <Link to="/RegistrationPage">
            <button className="border px-2 py-2 rounded-md mt-5">
              Start Teaching Today
            </button>
          </Link>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Home;
