import { useMutation, useQuery, useQueryClient } from "react-query";
import DishService from "../api/services/DishService";

function useDishesHook() {
  const query = useQuery({
    queryKey: ["dishes"],
    queryFn: DishService.getAllDishes,
  });

  const queryClient = useQueryClient();
  const dishes = query.data?.data || [];
  const deleteDishMutation = useMutation({
    mutationFn: (dishId) => DishService.deleteDish(dishId),
  });
  const updateDishMutation = useMutation({
    mutationFn: DishService.updateDish,
    onSuccess: (updatedDish) => {
      queryClient.setQueryData(["dishes"], (oldData) => {
        const updatedData = oldData.data.map((dish) =>
          dish.id === updatedDish.data.id ? updatedDish.data : dish
        );
        return { ...oldData, data: updatedData };
      });
    },
  });

  return {
    dishes,
    isLoading: query.isLoading,
    isError: query.isError,
    deleteDishMutation,
    updateDishMutation,
  };
}

export default useDishesHook;
