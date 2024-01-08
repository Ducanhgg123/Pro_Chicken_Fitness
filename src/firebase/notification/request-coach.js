import {
  collection,
  doc,
  getCountFromServer,
  getDocs,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { isCoach } from "../../utilities/checkRole";
import { db } from "../firebase";

export const setUpNotificationRequestCoach = () => {
  const userRef = doc(
    db,
    "notification",
    "request-coach",
    "requests",
    "request"
  );
  setDoc(userRef, {}, { merge: true });
};

export const getRequestForCoach = async (user) => {
  let requests = [];
  const requestsCoachRef = collection(
    db,
    "notification",
    "request-coach",
    "requests"
  );
  const q = query(
    requestsCoachRef,
    where("receiver", "==", user.username),
    where("status", "==", 0)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    requests.push({ id: doc.id, data: doc.data() });
  });
  return requests;
};

export const getAcceptedRequestForUser = async (user) => {
  let requests = [];
  const requestsCoachRef = collection(
    db,
    "notification",
    "request-coach",
    "requests"
  );
  const q = query(
    requestsCoachRef,
    where("sender", "==", user.username),
    where("status", "==", 1)
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    requests.push({ id: doc.id, data: doc.data() });
  });
  return requests;
};

export const countNotificationsCoachRequest = async (user, setFunction) => {
  const requestsCoachRef = collection(
    db,
    "notification",
    "request-coach",
    "requests"
  );
  const q = query(
    requestsCoachRef,
    where("receiver", "==", user.username),
    where("status", "==", 0)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let countQuery = 0;
    querySnapshot.forEach((_) => {
      countQuery += 1;
    });
    console.log("count query", countQuery);
    setFunction(countQuery);
  });

  return () => {
    console.log("unsubscribing");
    unsubscribe();
  };
};

export const countNotificationsForAccepted = (user, setFunction) => {
  const requestsCoachRef = collection(
    db,
    "notification",
    "request-coach",
    "requests"
  );
  const q = query(
    requestsCoachRef,
    where("sender", "==", user.username),
    where("status", "==", 1)
  );
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    let countQuery = 0;
    querySnapshot.forEach((_) => {
      countQuery += 1;
    });
    setFunction(countQuery);
  });

  return () => {
    console.log("unsubscribing");
    unsubscribe();
  };
};

export const acceptRequestFromClient = async (requestId) => {
  const requestRef = doc(
    db,
    "notification",
    "request-coach",
    "requests",
    requestId
  );
  await updateDoc(requestRef, {
    message: "Congratulation! You have another coach",
    status: 1,
  });
};
