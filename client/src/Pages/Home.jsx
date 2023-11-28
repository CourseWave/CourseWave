import React, { useEffect, useState } from "react";
import HeroSection from "../Components/HeroSection";
import StatisticsHome from "../Components/StatisticsHome";
import LatestCourses from "../Components/LatestCourses";
import WhyChooseUs from "../Components/WhyChooseUs";
import TopCategories from "../Components/TopCategories";
const Home = () => {
  return (
    <>
      <HeroSection />
      <StatisticsHome />
      <WhyChooseUs />
      <LatestCourses />
      <TopCategories />
    </>
  );
};

export default Home;
