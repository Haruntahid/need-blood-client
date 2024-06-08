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
import AdminRoute from "./AdminRoute";
import BlogDetails from "../pages/Dashboard/BlogDetails";
import BloodDonationRequests from "../pages/BloodDonationRequests";
import BlogPage from "../pages/BlogPage";
import BloodDonationRequestsDetails from "../pages/BloodDonationRequestsDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/donation-request",
        element: <BloodDonationRequests />,
      },
      {
        path: "/blog",
        element: <BlogPage />,
      },
      {
        path: "/donation-req-details/:id",
        element: <BloodDonationRequestsDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/donation/${params.id}`),
      },
      {
        path: "blog-details/:id",
        element: <BlogDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/blog/${params.id}`),
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
        element: (
          <AdminRoute>
            <AdminHome />
          </AdminRoute>
        ),
      },
      {
        path: "all-users",
        element: (
          <AdminRoute>
            <AllUsers />
          </AdminRoute>
        ),
      },
      {
        path: "all-blood-donation-request",
        element: (
          <AdminRoute>
            <AllBloodDonationRequest />
          </AdminRoute>
        ),
      },
      {
        path: "content-management",
        element: (
          <AdminRoute>
            <ContentManagement />
          </AdminRoute>
        ),
      },
      {
        path: "content-management/add-blog",
        element: <AddBlog />,
      },
      {
        path: "blog-details/:id",
        element: <BlogDetails />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/blog/${params.id}`),
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
      // {
      //   path: "content-management",
      //   element: <ContentManagement />,
      // },
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
