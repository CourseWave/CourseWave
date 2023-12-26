import { useState, useEffect } from "react";
import Cookies from "js-cookie";

export const useIsLoggedIn = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) return;
    token && setIsLoggedIn(true);
  }, []);
  return { isLoggedIn };
};
