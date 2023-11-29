import React from "react";
// import Feature1Image from "../Assets/feature1.png";
// import Feature2Image from "../Assets/feature2.png";
// import Feature3Image from "../Assets/feature3.png";
// import Feature4Image from "../Assets/feature4.png";
// import TeamMember1Image from "../Assets/team-member1.png";
// import TeamMember2Image from "../Assets/team-member2.png";
// import AboutUsImage from "../Assets/about-us-image.png";

const AboutUsPage = () => {
  return (
    <div className="container mx-auto mt-8">
      {/* Top Image */}
      <img src="" alt="About Us" className="w-full h-64 object-cover mb-8" />

      {/* Features under Images */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Feature 1 */}
        <div className="flex flex-col items-center">
          <img src={"Feature1Image"} alt="Feature 1" className="h-32 mb-4" />
          <h3 className="text-xl font-bold mb-2">Feature 1</h3>
          <p className="text-gray-600">Description of Feature 1.</p>
        </div>

        {/* Feature 2 */}
        <div className="flex flex-col items-center">
          <img src={"Feature2Image"} alt="Feature 2" className="h-32 mb-4" />
          <h3 className="text-xl font-bold mb-2">Feature 2</h3>
          <p className="text-gray-600">Description of Feature 2.</p>
        </div>

        {/* Feature 3 */}
        <div className="flex flex-col items-center">
          <img src={"Feature3Image"} alt="Feature 3" className="h-32 mb-4" />
          <h3 className="text-xl font-bold mb-2">Feature 3</h3>
          <p className="text-gray-600">Description of Feature 3.</p>
        </div>

        {/* Feature 4 */}
        <div className="flex flex-col items-center">
          <img src={"Feature4Image"} alt="Feature 4" className="h-32 mb-4" />
          <h3 className="text-xl font-bold mb-2">Feature 4</h3>
          <p className="text-gray-600">Description of Feature 4.</p>
        </div>
      </div>

      {/* Team Members */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-8">
        {/* Team Member 1 */}
        <div className="flex flex-col items-center">
          <img src={"TeamMember1Image"} alt="Team Member 1" className="h-32 mb-4" />
          <h3 className="text-xl font-bold mb-2">Team Member 1</h3>
          <p className="text-gray-600">Role of Team Member 1.</p>
        </div>

        {/* Team Member 2 */}
        <div className="flex flex-col items-center">
          <img src={"TeamMember2Image"} alt="Team Member 2" className="h-32 mb-4" />
          <h3 className="text-xl font-bold mb-2">Team Member 2</h3>
          <p className="text-gray-600">Role of Team Member 2.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
