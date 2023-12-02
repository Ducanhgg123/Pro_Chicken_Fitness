import AxiosInstance from "../../config/AxiosInstance";

class AuthenticationService {
  login = async (username, password) => {
    try {
      const response = await AxiosInstance.post("/authentication/login", {
        username,
        password,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };

  signup = async (username, password) => {
    try {
      const response = await AxiosInstance.post("/authentication/register", {
        username,
        password,
      });
      return response;
    } catch (error) {
      console.log(error);
    }
  };
}

export default new AuthenticationService();
