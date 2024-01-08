import { useEffect, useState } from "react";
import CardCoach from "../components/CardCoach";
import Header from "../components/Header";
import CoachService from "../api/services/CoachService";
import { useSelector } from "react-redux";
import { useQuery } from "react-query";

function CoachesPage() {
  const [coaches, setCoaches] = useState([]);
  const { user, username } = useSelector((state) => state.user);
  const { data } = useQuery({
    queryKey: ["user-coaches", user?.username],
    queryFn: () => CoachService.getUserCoach(user?.username),
  });

  const subscribedCoaches = data?.data;

  useEffect(() => {
    const getCoaches = async () => {
      try {
        const res = await CoachService.getAllCoaches();
        if (res?.status == 200) {
          setCoaches(res.data);
        }
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    getCoaches();
  }, []);
  return (
    <div>
      <Header />
      <div
        className="container"
        style={{
          position: "relative",
          top: "100px",
        }}
      >
        <div className="mt-3">
          <h2 className="text-center mb-3">Coaches</h2>
          <div className="row gap-3">
            {coaches?.map((coach, index) =>
              coach?.username !== username ? (
                <CardCoach
                  key={index}
                  coach={coach}
                  subscribedCoaches={subscribedCoaches}
                />
              ) : null
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoachesPage;
