import AxiosInstance from "../../config/AxiosInstance";

class CommentService {
  createComment = async (username, postId, content) => {
    try {
      const response = await AxiosInstance.post("/comment/", {
        username,
        postId,
        content,
      });
      return response;
    } catch (error) {
      return error;
    }
  };
}

export default new CommentService();
