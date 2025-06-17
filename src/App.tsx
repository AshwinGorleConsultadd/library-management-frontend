import { ThemeToggle } from "./components/theme-toggle";
import { SignupForm } from "./components/forms/signup-form";
import SignupPage from "./components/page/auth-pages/signup-page";
import LoginPage from "./components/page/auth-pages/login-page";

import { ThemeProvider } from "./components/theme-provider";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import { RouterProvider } from "react-router";
import router from "./router.js";
import { ToastContainer, toast } from "react-toastify";

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Provider store={store}>
        <ToastContainer />
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  );
}

export default App;
