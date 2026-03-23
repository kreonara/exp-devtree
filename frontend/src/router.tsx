import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./layouts/AuthLayout";
import AppLayout from "./layouts/AppLayout";
import LinkTreeView from "./pages/LinkTreeView";
import ProfileView from "./pages/ProfileView";
import HandlePage from "./pages/HandleView";
import NotFoundPage from "./pages/NotFoundPage";

const appRouter = createBrowserRouter([
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <LoginPage />
      },
      {
        path: 'register',
        element: <RegisterPage />
      }
    ]
  },
  {
    path: '/admin',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <LinkTreeView />
      },
      {
        path: 'profile',
        element: <ProfileView />
      }
    ]
  },
  {
    path: '/:handle',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <HandlePage />
      }
    ]
  },
  {
    path: '/404',
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <NotFoundPage />
      }
    ]
  }
])

export default appRouter