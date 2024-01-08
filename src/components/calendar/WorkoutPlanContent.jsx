function WorkoutPlanContent({ workoutActivities }) {
  return (
    <div
      className="day-blog-content"
      style={{
        minHeight: "300px",
      }}
    >
      <h5>Workout Plan</h5>
      {workoutActivities?.map((workout, idx) => (
        // there will be a picture
        <div key={idx}>
          <img
            style={{
              width: "100%",
              height: "50px",
            }}
            src={"./image/AnhCorgiDeThuong.png"}
            alt=""
          />
          <div key={workout?.id}>{workout?.name}</div>
        </div>
      ))}
    </div>
  );
}

export default WorkoutPlanContent;
