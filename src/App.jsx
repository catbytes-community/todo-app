import "./App.css";
import LoginPage from "./pages/LoginPage";
import TodoPage from "./pages/TodoPage";

function App() {
  const isAuth = localStorage.getItem("isAuth");

  return <div>{isAuth ? <TodoPage /> : <LoginPage />}</div>;
}

export default App;
