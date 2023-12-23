function WorkoutPlanContent({ workoutActivities }) {
  return (
    <div className="day-blog-content">
      <h5>Workout Plan</h5>
      {workoutActivities?.map((workout) => (
        // there will be a picture
        <div key={workout?.id}>{workout?.name}</div>
      ))}
    </div>
  );
}

export default WorkoutPlanContent;
