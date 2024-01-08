import { useMutation, useQuery, useQueryClient } from "react-query";
import PostService from "../api/services/PostService";

function usePostsHook() {
  const query = useQuery({
    queryKey: ["posts"],
    queryFn: PostService.getAllPosts,
  });
  const queryClient = useQueryClient();
  const posts = query.data?.data || [];
  const deletePostMutation = useMutation({
    mutationFn: (postId) => PostService.deletePost(postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  const updatePostMutation = useMutation({
    mutationFn: (formData) => PostService.updatePost(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
  return {
    posts,
    isLoading: query.isLoading,
    isError: query.isError,
    deletePostMutation,
    updatePostMutation,
  };
}

export default usePostsHook;
