import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export function useGetCurrentUser() {
  const user = useSelector((state) => state.user);

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (!user) return;
    let token = Cookies.get("userInfo");
    if (!token) return;
    token = JSON.parse(token);
    if (token.trainer) {
      setCurrentUser(
        user.teachers.find(
          (c) => c.trainer_id === parseInt(token.trainer.trainer_id)
        )
      );
    } else {
      if (token.user.role_id === 1) {
        setCurrentUser(token.user);
      } else {
        setCurrentUser(
          user.students.find((c) => c.user_id === parseInt(token.user.user_id))
        );
      }
    }
  }, [user]);
  return { currentUser };
}
