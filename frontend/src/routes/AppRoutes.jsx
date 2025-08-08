import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import About from "../pages/About";
import ProtectedRoutes from "./ProtectedRoutes";
import AccountSettings from "../pages/AccountSettings";
import Dashboard from "../pages/Dashboard";
import AdminPanel from "../pages/AdminPanel";
import Login from "../pages/Login";
import SignUp from "../pages/Signup";
import ForgotPassword from "../pages/ForgotPassword";
import EditProfile from "../pages/EditProfile";
import ResetPassword from "../pages/ResetPassword";
import NotFound from "../components/NotFound";
import ExploreStyles from "../pages/ExploreStyles";
import NotificationPage from "../pages/Notifications";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
      {
        path: "about",
        element: <About />,
      }, {
        path: "notifications",
        element: <NotificationPage />,
      },
       {
        path: "hijab-styles",
        element: <ExploreStyles />,
      },
      // Auth routes
   
      // Protected dashboard routes
      {
        path: "dashboard",
        element: (
          <ProtectedRoutes>
            <MainLayout /> {/* Use MainLayout here */}
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: <Dashboard />,
          },
          {
            path: "account-settings",
            element: <AccountSettings />,
          },
         
        ,{
            path: "update-profile",
            element: <EditProfile />,
          },
        ],
      },

      // Admin routes
      {
        path: "admin",
        element: (
          <ProtectedRoutes role="admin">
            <MainLayout /> {/* Use MainLayout here */}
          </ProtectedRoutes>
        ),
        children: [
          {
            index: true,
            element: <AdminPanel />,
          },
        ],
      },
    ],
  },
     { path: "login", element: <Login /> },
      { path: "signup", element: <SignUp /> },
      { path: "reset-password", element: <ResetPassword /> },
      { path: "forgot-password", element: <ForgotPassword /> },
      
]);
export default router