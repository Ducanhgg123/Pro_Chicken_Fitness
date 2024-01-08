import { useMutation, useQuery, useQueryClient } from "react-query";
import IngredientService from "../api/services/IngredientService";

function useIngredientsHook() {
  const query = useQuery({
    queryKey: ["ingredients"],
    queryFn: IngredientService.getAllIngredients,
  });
  const queryClient = useQueryClient();
  const ingredients = query.data?.data || [];
  const updateIngredientMutation = useMutation({
    mutationFn: (ingredient) => IngredientService.updateIngredient(ingredient),
    onSuccess: () => {
      queryClient.invalidateQueries(["ingredients"]);
    },
  });
  const deleteIngredientMutation = useMutation({
    mutationFn: (ingredientId) =>
      IngredientService.deleteIngredient(ingredientId),
    onMutate: async (ingredientId) => {
      // Snapshot the previous value
      const previousIngredients = queryClient.getQueryData("ingredients");

      // Optimistically update to the new value
      queryClient.setQueryData("ingredients", (old) => ({
        ...old,
        data: old.data.filter((ingredient) => ingredient.id !== ingredientId),
      }));

      return { previousIngredients };
    },
    onError: (err, ingredientId, context) => {
      // On error, roll back to the previous value
      queryClient.setQueryData("ingredients", context.previousIngredients);
    },
    // onSuccess: () => {
    //   queryClient.invalidateQueries("ingredients");
    // },
  });

  return {
    ingredients,
    isLoading: query.isLoading,
    isError: query.isError,
    deleteIngredientMutation,
    updateIngredientMutation,
  };
}

export default useIngredientsHook;
