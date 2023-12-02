import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage"
import RecoveryProfile from "../pages/RecoveryProfile"

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
    element: <SignupPage/>,
  },
  {
    path: "/recovery",
    element: <RecoveryProfile/>,
  },
]);

export default router;
