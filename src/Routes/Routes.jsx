import React from 'react';
import Home from '../pages/Home/Home';
import Root from '../pages/Root/Root';
import { createBrowserRouter } from 'react-router-dom';
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
    ],
  },
]);