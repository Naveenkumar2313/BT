import { lazy } from "react";
import { Navigate } from "react-router-dom";

import ParcLayout from "./components/ParcLayout/ParcLayout";
import DefaultDashboard from "./views/dashboard/DefaultDashboard";
import Dummy1 from "./views/Dummy1";
import ProblemsPage from "./views/problems/ProblemsPage";
import ProblemDetailPage from "./views/problems/ProblemDetailPage";
// import Demo from "./components/Demo";

const routes = [
  { path: "/", element: <Navigate to="dashboard/default" /> },
  {
    element: <ParcLayout />,
    children: [
      { path: "/dashboard/default", element: <ProblemsPage /> },
      { path: "/dummy1", element: <Dummy1 /> },
      { path: "/problems", element: <ProblemsPage /> },
      { path: "/problems/:id", element: <ProblemDetailPage /> },
    ]
  }
];

export default routes;
