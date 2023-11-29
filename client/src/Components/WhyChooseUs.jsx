import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Hero from "../Assets/Hero.png";

const WhyChooseUs = () => {
  useEffect(() => {
    AOS.init();
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-3xl font-bold mb-4 flex justify-center">
        Why Choose Us?
      </h2>
      <div className="flex flex-col">
        {/* Animation 1 */}
        <div data-aos="fade-left" className="flex m-10 items-center justify-between md:flex-row flex-col">
          <div className="flex flex-col w-full md:w-1/2">
            <h2 className="font-bold mb-4">Access For Unlimited Growth</h2>
            <p className="mt-2">
              Unlock endless possibilities with our platform, offering unlimited
              access to a vast array of courses for your personal and
              professional growth.
            </p>
          </div>
          <img src={Hero} alt="Image 1" className="h-52 object-cover md:w-1/2" />
        </div>

        {/* Animation 2 */}
        <div data-aos="fade-right" className="flex m-10 items-center justify-between md:flex-row flex-col">
          <img src={Hero} alt="Image 2" className="h-52 object-cover md:w-1/2" />
          <div className="flex flex-col w-full md:w-1/2">
            <h2 className="font-bold mt-4 ml-4">Expert Instructors</h2>
            <p className="mt-2 ml-4">
              Learn from industry experts and experienced instructors who are
              dedicated to helping you succeed in your learning journey.
            </p>
          </div>
        </div>

        {/* Animation 3 */}
        <div data-aos="fade-left" className="flex m-10 items-center justify-between md:flex-row flex-col">
          <div className="flex flex-col w-full md:w-1/2">
            <h2 className="font-bold mt-4">Online Classes</h2>
            <p className="mt-2">
              Enjoy the convenience of online classes, allowing you to learn
              anytime, anywhere, and at your own pace.
            </p>
          </div>
          <img src={Hero} alt="Image 3" className="h-52 object-cover md:w-1/2" />
        </div>
      </div>
    </div>
  );
};

export default WhyChooseUs;
