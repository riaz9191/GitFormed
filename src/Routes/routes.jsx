import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Shared/Login";
import SignUp from "../Pages/Shared/SignUp";
import Repositories from "../Pages/Repositories/Repositories";
import MyRepositories from "../Pages/Repositories/MyRepositories";
import PrivateRoutes from "./PrivateRoutes";
import CreateRepository from "../Pages/Repositories/CreateRepository";
import CreatePullRequest from "../Pages/Repositories/CreatePullRequest";
import PullRequestList from "../Pages/Repositories/PullRequestList";
import WatchRepositories from "../Pages/Repositories/WatchRepositories";
import Error404 from "../Pages/Error/Error404.jsx";

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
      {
        path: "/createRepositories",
        element: <PrivateRoutes><CreateRepository/></PrivateRoutes>,
      },
      {
        path: "/pullRepositories",
        element: <PrivateRoutes><CreatePullRequest/></PrivateRoutes>,
      },
      {
        path: "/createPullRequest/:repositoryId",
        element: <PrivateRoutes><CreatePullRequest/></PrivateRoutes>,
      },
      {
        path: "/pullRepositoriesList",
        element: <PrivateRoutes><PullRequestList/></PrivateRoutes>,
      },
      {
        path: "/watchRepositories",
        element: <PrivateRoutes><WatchRepositories/></PrivateRoutes>,
      },
    ]
  },
  {
    path: "*",
    element: <Error404 />,
  },
]);
