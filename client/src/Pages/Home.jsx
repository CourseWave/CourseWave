import HeroSection from "../Components/HeroSection";
import StatisticsHome from "../Components/StatisticsHome";
import LatestCourses from "../Components/LatestCourses";
import WhyChooseUs from "../Components/WhyChooseUs";
import TopCategories from "../Components/TopCategories";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <>
      <HeroSection />
      <StatisticsHome />
      <WhyChooseUs />
      <LatestCourses />
      <TopCategories />
      <Footer />
    </>
  );
};

export default Home;
