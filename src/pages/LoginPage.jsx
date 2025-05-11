import { useState } from "react";
import axios from "axios";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async () => {
    console.log("Login user...");

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        password,
      });

      console.log("Response from server:", response);
    } catch (err) {
      console.log("Login error: ", err);
    }
  };

  return (
    <div className="w-1/3 mx-auto mt-30">
      <input
        type="email"
        placeholder="Email"
        className="border-[1px] border-slate-200 p-3 bg-white rounded w-full mb-3"
        autoComplete="off"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        className="border-[1px] border-slate-200 p-3 bg-white rounded w-full"
        autoComplete="off"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-teal-500 text-white p-3 w-full rounded mt-10"
        onClick={login}
      >
        Login
      </button>
    </div>
  );
}
