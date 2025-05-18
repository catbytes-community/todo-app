import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const login = async () => {
    console.log("Login user...");
    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    console.log("hash:", hash);

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
        hash,
      });

      if(response.status === 200) {
        const isAuth = bcrypt.compareSync(password, response.data.hashedPassword);
        
        if(isAuth) {
          localStorage.setItem("isAuth", true);
          navigate("/todo");
        }
      }

    } catch (err) {
      console.log("Login error: ", err);
      setError(err.response.data.message || "Login failed, please try again later");
    }
  };

  return (
    <div className="w-1/3 mx-auto mt-30">
      {
        error && (
          <p className="text-red-500 italic">{error}</p>
        )
      }
      <input
        type="email"
        placeholder="Email"
        className="border-[1px] border-slate-200 p-3 bg-white rounded w-full mb-3"
        autoComplete="off"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          setError("")
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
      <button
        className="bg-teal-500 text-white p-3 w-full rounded mt-10"
        onClick={login}
      >
        Login
      </button>
    </div>
  );
}
