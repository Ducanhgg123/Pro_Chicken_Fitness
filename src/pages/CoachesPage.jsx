import React from "react";
import CardCoach from "../components/CardCoach";

function CoachesPage() {
  return (
    <div>
      <header>Header</header>
      <div className="container">
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
