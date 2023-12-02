import AxiosInstance from "../../config/AxiosInstance";

class PostService {
  getAllPosts = async () => {
    try {
      const response = await AxiosInstance.get("/post/");
      return response;
    } catch (error) {
      return error;
    }
  };

  likePost = async (postId) => {
    try {
      const response = await AxiosInstance.put(`/post/like/${postId}`);
      return response;
    } catch (error) {
      return error;
    }
  };

  createPost = async (formData) => {
    try {
      const response = await AxiosInstance.post("/post/", formData);
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new PostService();
