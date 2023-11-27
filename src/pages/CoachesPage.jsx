import CardCoach from "../components/CardCoach";
import Header from "../components/Header";

function CoachesPage() {
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
            {Array.from({ length: 5 }).map((item, index) => (
              <CardCoach key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoachesPage;
