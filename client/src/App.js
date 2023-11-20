import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./Components/Footer";
import Navbar from "./Components/NavBar";
import RegistrationPage from "./Pages/RegisterPage";
import Home from "./Pages/Home";
import AboutUsPage from "./Pages/AboutUsPage";
import ContactUsPage from "./Pages/ContactUsPage";
import CategoryPage from "./Pages/Categories";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="RegistrationPage" element={<RegistrationPage />} />
          <Route path="CategoryPage" element={< CategoryPage/>} />
          <Route path="AboutUsPage" element={<AboutUsPage />} />
          <Route path="ContactUsPage" element={<ContactUsPage />} />
        </Routes>
        {/* <Footer /> */}
      </BrowserRouter>
    </>
  );
}

export default App;
