import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import Login from "../pages/LoginPage";
import PersonalInformationPage from "../pages/PersonalInformationPage";
import SignupPage from "../pages/SignupPage";
import CoachesPage from "../pages/CoachesPage";
import CoachDetailsPage from "../pages/CoachDetailsPage";
import ProfilePage from "../pages/ProfilePage";
import BecomeCoachPage from "../pages/BecomeCoachPage";
import CalendarPage from "../pages/CalendarPage";
import PaymentPage from "../pages/PaymentPage";
import ChatPage from "../pages/ChatPage";

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
    path: "/calendar",
    element: <CalendarPage />,
  },
  {
    path: "/payment",
    element: <PaymentPage />,
  },
  {
    path: "/become-coach",
    element: <BecomeCoachPage />,
  },
  {
    path: "/coaches/coach/1",
    element: <CoachDetailsPage />,
  },
  {
    path: "/fitness-chat",
    element: <ChatPage />,
    children: [
      {
        path: ":conversationId",
        element: <div>Conversation content</div>,
      },
    ],
  },
]);

export default router;
