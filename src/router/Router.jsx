import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";
import Home from "../pages/Home/Home";
import AuthLayout from "../layout/AuthLayout";
import Login from "../pages/authentication/Login";
import Registration from "../pages/authentication/Registration";
import covarage from "../pages/coverage/covarage";
import PrivateRoute from "../routes/PrivateRoute";
import SendParcel from "../pages/sendParcel/SendParcel";

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/covarage",
        Component: covarage,
      },
      {
        path: "/sendParcel",
        element: (
          <PrivateRoute>
            <SendParcel />
          </PrivateRoute>
        ),
        loader: () => fetch('/src/data/warehouses.json')
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Registration,
      },
    ],
  },
]);

export default router;
