import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../layouts/Dashboard";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import DonorHome from "../pages/Dashboard/DonorHome/DonorHome";
import Profile from "../pages/Dashboard/Profile";
import CreateDonation from "../pages/Dashboard/CreateDonation";
import DonationRequest from "../pages/Dashboard/DonationRequest";
import PrivateRoute from "./PrivatRoute";
import UpdateDonation from "../pages/Dashboard/UpdateDonation";
import DonationReqDetails from "../pages/Dashboard/DonationReqDetails";
import AdminHome from "../pages/Dashboard/AdminHome/AdminHome";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
  // dashboard
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
    children: [
      //================= Donor Routes =====================
      {
        path: "/dashboard/donor",
        element: <DonorHome />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
      {
        path: "create-donation-request",
        element: <CreateDonation />,
      },
      {
        path: "my-donation-request",
        element: <DonationRequest />,
      },
      {
        path: "update-donation/:id",
        element: <UpdateDonation />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/donation/${params.id}`),
      },
      {
        path: "donation-details/:id",
        element: <DonationReqDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/donation/${params.id}`),
      },

      // ========== Admin Routes ===================
      {
        path: "/dashboard/admin",
        element: <AdminHome />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
]);
