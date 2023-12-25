import { createBrowserRouter } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import Register from "../Pages/Register/Register";
import Dashboard from "../Pages/Dashboard/Dashboard";
import UpdateTask from "../components/UpdateTask/UpdateTask";
import Error from "../Pages/Error/Error";




const Router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
      errorElement: <Error />,
      children: [
        {
            path: "/",
            element: <Home />
        },
        {
          path: "/login",
          element: <Login />
        },
        {
          path: "/register",
          element: <Register />
        },
        {
          path: "/dashboard",
          element: <Dashboard />
        },
        {
          path: "/update/:id",
          element: <UpdateTask />
        }
      ]
    },
  ]);


export default Router;