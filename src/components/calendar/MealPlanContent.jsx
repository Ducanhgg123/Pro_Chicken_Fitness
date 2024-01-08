function MealPlanContent({ dishes }) {
  const totalCaloriesSum =
    dishes?.reduce((acc, dish) => acc + dish.totalCalories, 0) || 0;
  return (
    <>
      <div
        className="day-blog-content"
        style={{ height: "300px", overflow: "auto" }}
      >
        <h5>Meal Plan</h5>
        {dishes?.map((dish) => (
          <div key={dish.id}>{dish.name}</div>
        ))}
      </div>
      <div className="total-calorie">
        <div>
          <h6>Total Calories:</h6>
          <h6>{totalCaloriesSum}</h6>
        </div>
      </div>
    </>
  );
}

export default MealPlanContent;
