import { useAuth } from "react-oidc-context";
import TodoPage from "./pages/TodoPage";

function App() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return <TodoPage auth={auth} />;
  }

  return (
    <div className="h-screen flex">
      <button
        className="bg-teal-500 text-white py-2 w-1/5 m-auto rounded"
        onClick={() => auth.signinRedirect()}
      >
        Sign in
      </button>
    </div>
  );
}

export default App;
