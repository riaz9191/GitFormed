import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Shared/Login";
import SignUp from "../Pages/Shared/SignUp";
import Repositories from "../Pages/Repositories/Repositories";
import MyRepositories from "../Pages/Repositories/MyRepositories";
import PrivateRoutes from "./PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main/>,
    children:[
      {
        path:'/',
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/repositories",
        element: <Repositories/>,
      },
      {
        path: "/myRepositories",
        element: <PrivateRoutes><MyRepositories/></PrivateRoutes>,
      },
    ]
  },
]);
