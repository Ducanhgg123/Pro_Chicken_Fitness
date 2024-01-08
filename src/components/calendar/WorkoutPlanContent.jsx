function WorkoutPlanContent({ workoutActivities }) {
  return (
    <div
      className="day-blog-content"
      style={{
        minHeight: "300px",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h5>Workout Plan</h5>
      <div
        className="activities"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "baseline",
          gap: "15px",
          flex: 1,
        }}
      >
        {workoutActivities?.map((workout, idx) => (
          // there will be a picture
          <div
            key={idx}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              borderRadius: "25px",
              padding: "0 15px",
              wordBreak: "break-word",
              width: "100%",
            }}
          >
            {/* <img
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "30px",
                objectFit: "contain",
              }}
              src={"./image/pro-chicken-logo.jpg"}
              alt=""
            /> */}
            <p
              key={workout?.id}
              style={{
                fontSize: "18px",
              }}
            >
              {workout?.name}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WorkoutPlanContent;
