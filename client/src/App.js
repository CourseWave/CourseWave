import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/NavBar";
import RegistrationPage from "./Pages/RegisterPage";
import Home from "./Pages/Home";
import AboutUsPage from "./Pages/AboutUsPage";
import ContactUsPage from "./Pages/ContactUsPage";
import CategoryPage from "./Pages/Categories";
import LoginPage from "./Pages/LoginPage";
import CourseDetailPage from "./Pages/CourseDetailPage";
import StudentProfile from "./Pages/StudentProfile";
import TeacherProfile from "./Pages/TeacherProfile";
import { CartsPage } from "./Pages/CartPage";
import PaymentPage from "./Pages/PaymentPage";
import Dashboard from "./Pages/Dashboard";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="RegistrationPage" element={<RegistrationPage />} />
          <Route path="LoginPage" element={<LoginPage/>} />
          <Route path="CategoryPage" element={< CategoryPage/>} />
          <Route path="AboutUsPage" element={<AboutUsPage />} />
          <Route path="ContactUsPage" element={<ContactUsPage />} />
          <Route path="/CourseDetailPage/:courseId" element={<CourseDetailPage />} />
          <Route path="StudentProfile" element={<StudentProfile />} />
          <Route path="TeacherProfile" element={<TeacherProfile />} />
          <Route path="CartsPage" element={<CartsPage />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="PaymentPage" element={<PaymentPage />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>

    </>
  );
}

export default App;
