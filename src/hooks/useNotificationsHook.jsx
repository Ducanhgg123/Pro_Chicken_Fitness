import { useEffect, useState } from "react";
import { isCoach } from "../utilities/checkRole";
import { useSelector } from "react-redux";
import {
  countNotificationsCoachRequest,
  countNotificationsForAccepted,
} from "../firebase/notification/request-coach";

export const useCountNotifications = () => {
  const [resultCount, setResultCount] = useState(0);
  const { user, userRoles } = useSelector((state) => state.user);
  useEffect(() => {
    let unsubscribe = null;
    if (isCoach(userRoles)) {
      unsubscribe = countNotificationsCoachRequest(user, setResultCount);
    } else {
      unsubscribe = countNotificationsForAccepted(user, setResultCount);
    }
    if (typeof unsubscribe === "function") return unsubscribe;
  }, [user]);

  return resultCount;
};
