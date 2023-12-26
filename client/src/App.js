import "./App.css";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./Components/NavBar";
import RegistrationPage from "./Pages/RegisterPage";
import Home from "./Pages/Home";
import AboutUsPage from "./Pages/AboutUsPage";
import ContactUsPage from "./Pages/ContactUsPage";
import CategoryPage from "./Pages/Categories";
import LoginPage from "./Pages/LoginPage";
import CourseDetailPage from "./Pages/CourseDetailPage";
import { CartsPage } from "./Pages/CartPage";
import Dashboard from "./Pages/Dashboard";
import MyLearning from "./Components/MyLearning";
import CoursePreview from "./Pages/CoursePreview";
import LiveSessionPage from "./Pages/LiveSessionPage";
import Checkout from "./Components/Checkout";
import { useIsLoggedIn } from "./hooks/useIsLoggedIn";
import { useGetUserType } from "./hooks/useGetUserType";
import { ErrorPage } from "./Pages/ErrorPage";
import { useLayoutEffect, useEffect, useState } from "react";

const Wrapper = ({ children }) => {
  const location = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTo(0, 0);
  }, [location.pathname]);
  return children;
};

const SplashScreen = () => {
  const { isLoggedIn } = useIsLoggedIn();

  return (
    <div className={`splash-screen`}>
      <span className="title">C</span>
      <span className="title">O</span>
      <span className="title">U</span>
      <span className="title">R</span>
      <span className="title">S</span>
      <span className="title">E</span>
      <span className="title">W</span>
      <span className="title">A</span>
      <span className="title">V</span>
      <span className="title">E</span>
      <span className="title"> {isLoggedIn ? "🤗" : "👋"}</span>
    </div>
  );
};

function App() {
  const { isLoggedIn } = useIsLoggedIn();
  const { userType } = useGetUserType();
  const guardedRoutes = {
    student: (
      <>
        <Route path="CartsPage" element={<CartsPage />} />
        <Route path="PaymentPage" element={<Checkout />} />
        <Route path="MyLearning" element={<MyLearning />} />
        <Route path="CoursePreview/:courseId" element={<CoursePreview />} />
      </>
    ),
    teacher: <Route path="Dashboard" element={<Dashboard />} />,
    admin: <Route path="Dashboard" element={<Dashboard />} />,
  };
  const [isAppReady, setIsAppReady] = useState(false);

  useEffect(() => {
    const initializeApp = async () => {
      // Perform any initialization tasks here
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Set the app readiness state to true
      setIsAppReady(true);
    };

    initializeApp();
  }, []);

  if (!isAppReady) {
    return <SplashScreen />;
  }
  return (
    <BrowserRouter>
      <Navbar />
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="RegistrationPage" element={<RegistrationPage />} />
          <Route path="Login" element={<LoginPage />} />
          <Route path="CategoryPage" element={<CategoryPage />} />
          <Route path="AboutUsPage" element={<AboutUsPage />} />
          <Route path="ContactUsPage" element={<ContactUsPage />} />
          <Route
            path="/CourseDetailPage/:courseId"
            element={<CourseDetailPage />}
          />
          <Route path="LiveSessionPage" element={<LiveSessionPage />} />
          {isLoggedIn && guardedRoutes[userType]}
          <Route path="Error" element={<ErrorPage />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Wrapper>
    </BrowserRouter>
  );
}

export default App;
