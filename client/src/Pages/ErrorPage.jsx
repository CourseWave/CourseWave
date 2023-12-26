import { useIsLoggedIn } from "../hooks/useIsLoggedIn";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const ErrorPage = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useIsLoggedIn();

  useEffect(() => {
    if (!isLoggedIn) navigate("/Login");
  }, [isLoggedIn]);

  return (
    <div className="">
      <p className="text-red-500 text-4xl">404 Page Not Found</p>
    </div>
  );
};
