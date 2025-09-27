import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TodoPage from "./pages/TodoPage.jsx";
import { AuthProvider } from "react-oidc-context";

let router = createBrowserRouter([
  {
    path: "/",
    Component: App,
  },
  {
    path: "/todo",
    Component: TodoPage,
  },
]);

const cognitoAuthConfig = {
  authority: import.meta.env.VITE_COGNITO_AUTHORITY,
  client_id: import.meta.env.VITE_COGNITO_CLIENT_ID,
  redirect_uri: import.meta.env.VITE_COGNITO_REDIRECT_URI,
  response_type: "code",
  scope: "phone openid email",
};

createRoot(document.getElementById("root")).render(
  <AuthProvider {...cognitoAuthConfig}>
    <Provider store={store}>
      <RouterProvider router={router}>
        <App />
      </RouterProvider>
    </Provider>
  </AuthProvider>
);
