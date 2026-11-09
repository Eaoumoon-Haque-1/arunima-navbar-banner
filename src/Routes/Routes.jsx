import React from "react";
import Home from "../pages/Home/Home";
import Root from "../pages/Root/Root";
import { createBrowserRouter } from "react-router-dom";
import Membership from "../pages/Membership/Membership";
import Tournaments from "../pages/Tornaments/Tournaments";
import AffliatedClubs from "../pages/AffliatedClubs/AffliatedClubs";
import Contact from "../pages/Contact/Contact";
import Gallery from "../pages/Gallery/Gallery";
import Login from "../pages/Login/Login";
import Members from "../pages/Members/Members";
import Accounts from "../pages/Accounts/Accounts";
import Notifications from "../pages/Notifications/Notifications";
export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    // errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        path: "/",
        Component: Home,
      },
      {
        path: "/membership",
        Component: Membership,
      },
      {
        path: "/tournaments",
        Component: Tournaments,
      },
      {
        path: "/affliated_clubs",
        Component: AffliatedClubs,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/gallery",
        Component: Gallery,
      },
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/members",
        Component: Members,
      },
      {
        path: "/accounts",
        Component: Accounts,
      },
      {
        path: "/notifications",
        Component: Notifications,
      },
    ],
  },
]);
