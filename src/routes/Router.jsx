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
import AllUsers from "../pages/Dashboard/Admin/AllUsers";
import AllBloodDonationRequest from "../pages/Dashboard/Admin/AllBloodDonationRequest";
import ContentManagement from "../pages/Dashboard/Admin/ContentManagement";
import AddBlog from "../pages/Dashboard/Admin/AddBlog";
import VolunteerHome from "../pages/Dashboard/Volunteer/VolunteerHome";
import VolunteerAllBloodDonationReq from "../pages/Dashboard/Volunteer/VolunteerAllBloodDonationReq";

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
        path: "donor",
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
        path: "admin",
        element: <AdminHome />,
      },
      {
        path: "all-users",
        element: <AllUsers />,
      },
      {
        path: "all-blood-donation-request",
        element: <AllBloodDonationRequest />,
      },
      {
        path: "content-management",
        element: <ContentManagement />,
      },
      {
        path: "content-management/add-blog",
        element: <AddBlog />,
      },
      // votunteer routes
      {
        path: "volunteer",
        element: <VolunteerHome />,
      },
      {
        path: "all-blood-donation-request2",
        element: <VolunteerAllBloodDonationReq />,
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
