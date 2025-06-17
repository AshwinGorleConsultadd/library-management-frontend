import React from "react";
import ReactDOM from "react-dom/client";
import PrivateRoute from "./components/protected-route";
import { createBrowserRouter, RouterProvider } from "react-router";
import HomePage from "./components/page/home-page/home-page";
import AboutPage from "./components/page/about-page/about-page";
import Layout from "./layout";
import LoginPage from "./components/page/auth-pages/login-page";
import VerifyEmailPage from "./components/page/auth-pages/verify-email-page";
import SignupPage from "./components/page/auth-pages/signup-page";
import DashboardPage from "./components/page/dashboard-page";
import BookPage from "./components/page/book-page/book-page";
import MemberPage from "./components/page/member-page/member-page";
import ReturnBookCard from "./components/page/issue-page/return-book-card";
const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(Layout),
    children: [
      {
        path: "/",
        element: React.createElement(
          PrivateRoute,
          {},
          React.createElement(DashboardPage)
        ),
      },
      {
        path: "/about",
        element: React.createElement(AboutPage),
      },
      {
        path: "/book",
        element: React.createElement(BookPage),
      },
      {
        path: "/member",
        element: React.createElement(MemberPage),
      },
      {
        path: "/borrow_history",
        element: React.createElement(ReturnBookCard),
      },
    ],
  },
  {
    path: "/signup",
    element: React.createElement(SignupPage),
  },
  {
    path: "/login",
    element: React.createElement(LoginPage),
  },
  {
    path: "/verify-email",
    element: React.createElement(VerifyEmailPage),
  },
  {
    path: "/dashboard",
    // Protect this route
    element: React.createElement(
      PrivateRoute,
      {},
      React.createElement(DashboardPage)
    ),
  },
]);

export default router;
