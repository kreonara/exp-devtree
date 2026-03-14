import { createBrowserRouter } from "react-router";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AuthLayout from "./layouts/AuthLayout";

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'auth/login',
        element: <LoginPage />
      },
      {
        path: 'auth/register',
        element: <RegisterPage />
      }
    ]
  }
])

export default appRouter