import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signIn } from "../auth/signIn";

export default function LoginPage() {
  // component states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // hooks
  const navigate = useNavigate();

  const login = async (event) => {
    console.log("Login user...");
    event.preventDefault();

    signIn(email, password)
      .then((res) => {
        console.log("Login user res", res);
        navigate("/todo");
      })
      .catch((err) => console.log("Login user err", err));
  };

  return (
    <div className="w-1/3 mx-auto mt-30">
      {error && <p className="text-red-500 italic">{error}</p>}
      <form onSubmit={(event) => login(event)}>
        <input
          type="email"
          placeholder="Email"
          className="border-[1px] border-slate-200 p-3 bg-white rounded w-full mb-3"
          autoComplete="off"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setError("");
          }}
        />
        <input
          type="password"
          placeholder="Password"
          className="border-[1px] border-slate-200 p-3 bg-white rounded w-full"
          autoComplete="off"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setError("");
          }}
        />
        <button className="bg-teal-500 text-white p-3 w-full rounded mt-10">
          Login
        </button>
      </form>

      <button className="underline mt-2" onClick={() => navigate("/signup")}>
        No account? Register
      </button>
    </div>
  );
}
