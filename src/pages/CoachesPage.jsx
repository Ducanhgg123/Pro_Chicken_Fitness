import { useEffect, useState } from "react";
import CardCoach from "../components/CardCoach";
import Header from "../components/Header";
import CoachService from "../api/services/CoachService";

function CoachesPage() {
  const [coaches, setCoaches] = useState([]);
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
            {coaches?.map((coach, index) => (
              <CardCoach key={index} coach={coach} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoachesPage;
