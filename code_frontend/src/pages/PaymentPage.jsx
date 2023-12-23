import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import CoachInformation from "../components/payment/CoachInformation";
import PaymentDetails from "../components/payment/PaymentDetails";
import { useEffect, useState } from "react";
import UserService from "../api/services/UserService";

function PaymentPage() {
  // state will have coachUsername to get coach info
  const { state } = useLocation();
  const [coach, setCoach] = useState(null);
  useEffect(() => {
    const getCoachInfo = async () => {
      try {
        if (state?.coachName) {
          const res = await UserService.getUserbyUsername(state.coachName);
          if (res?.status == 200) {
            setCoach(res.data);
          }
        } else {
          alert("dont have coachUsername");
        }
      } catch (error) {
        console.log(error);
      }
    };
    getCoachInfo();
  }, []);

  return (
    <>
      <Header />
      <div
        className="d-flex w-100 mt-3"
        style={{ position: "relative", top: "100px" }}
      >
        <PaymentDetails />
        <CoachInformation coach={coach} />
      </div>
    </>
  );
}

export default PaymentPage;
