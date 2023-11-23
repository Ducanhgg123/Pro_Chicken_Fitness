import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/LoginPage";
import PersonalInformationPage from "../pages/PersonalInformationPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <div>Sign up</div>,
  },
  {
    path: "/personal-information",
    element: <PersonalInformationPage />,
  },
]);

export default router;
