import TodoPage from "./pages/TodoPage";
import { useEffect, useState } from "react";
import { getCurrentUser } from "./auth/getUser";
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    getCurrentUser()
      .then(res => {
        console.log("current user App", res);
        setUser(res);
      })
      .catch(err => {
        console.log("Get user err App", err);
        setUser(null);
      })
  },[])

  if (user) {
    return <TodoPage />;
  }

  return (
    <div className="h-screen flex">
      <button
        className="bg-teal-500 text-white py-2 w-1/5 m-auto rounded"
        onClick={() => navigate('/login')}
      >
        Sign in
      </button>
    </div>
  );
}

export default App;
