import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/LoginPage";
import PersonalInformationPage from "../pages/PersonalInformationPage";
import SignupPage from "../pages/SignupPage";
import CoachesPage from "../pages/CoachesPage";
import CoachDetailsPage from "../pages/CoachDetailsPage";
import ProfilePage from "../pages/ProfilePage";

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
    element: <SignupPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/personal-information",
    element: <PersonalInformationPage />,
  },
  {
    path: "/coaches",
    element: <CoachesPage />,
  },
  {
    path: "/coaches/coach/1",
    element: <CoachDetailsPage />,
  },
]);

export default router;
