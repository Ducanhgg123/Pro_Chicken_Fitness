import AdminLayout from "../../components/layout/AdminLayout";
import AdminDishesPage from "../../pages/admin/AdminDishesPage";
import AdminIngredientsPage from "../../pages/admin/AdminIngredientsPage";
import AdminPage from "../../pages/admin/AdminPage";
import AdminPostsPage from "../../pages/admin/AdminPostsPage";
import AdminUsersPage from "../../pages/admin/AdminUsersPage";
import AdminWorkoutActivitiesPage from "../../pages/admin/AdminWorkoutActivitiesPage";

const adminRouters = [
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        index: true,
        element: <AdminPage />,
      },
      {
        path: "workout-activities",
        element: <AdminWorkoutActivitiesPage />,
      },
      {
        path: "dishes",
        element: <AdminDishesPage />,
      },
      {
        path: "users",
        element: <AdminUsersPage />,
      },
      {
        path: "ingredients",
        element: <AdminIngredientsPage />,
      },
      {
        path: "posts",
        element: <AdminPostsPage />,
      },
    ],
  },
];

export default adminRouters;
