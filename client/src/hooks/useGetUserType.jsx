import { useIsLoggedIn } from "./useIsLoggedIn";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useGetUserType = () => {
  const [userType, setUserType] = useState("");
  const { isLoggedIn } = useIsLoggedIn();

  useEffect(() => {
    if (!isLoggedIn) return;
    let userInfo = Cookies.get("userInfo");

    if (!userInfo) return;
    userInfo = JSON.parse(userInfo);
    if (userInfo.user) {
      if (userInfo.user.role_id === 1) {
        setUserType("admin");
      } else {
        setUserType("student");
      }
    } else if (userInfo.trainer) {
      setUserType("teacher");
    } else {
      setUserType("student");
    }
  }, [isLoggedIn]);

  return { userType };
};
