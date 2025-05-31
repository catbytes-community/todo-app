import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bcrypt from "bcryptjs-react";

export default function LoginPage() {
  // component states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  // hooks
  const navigate = useNavigate();

  const validate = () => {
    if (!email || !password) {
      console.log("Email and password are required");
      return false;
    }
    return true;
  };

  const login = async () => {
    console.log("Login user...");

    if (!validate()) return;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);
    console.log("hash:", hash);

    try {
      const response = await axios.post("http://localhost:3001/login", {
        email,
      });
      console.log("Login res from server: ", response);

      if (response.status === 200) {
        const isAuth = bcrypt.compareSync(
          password,
          response.data.hashedPassword
        );

        if (isAuth) {
          localStorage.setItem("isAuth", true);
          localStorage.setItem("userId", response.data.userId);
          navigate("/todo");
        }
      }
    } catch (err) {
      console.log("Login error: ", err);
      setError(
        err?.response?.data?.message || "Login failed, please try again later"
      );
    }
  };

  const register = async () => {
    console.log("Registering user...");

    if (!validate()) return;

    var salt = bcrypt.genSaltSync(10);
    var hash = bcrypt.hashSync(password, salt);

    // call register user API
    try {
      const response = await axios.post("http://localhost:3001/users", {
        email: email,
        hashedPassword: hash,
      });

      console.log("Register response: ", response);

      if (response.status === 201) {
        setMessage("You have successfullly registered! You may now login");
        setIsRegister(false);
      }
    } catch (err) {
      console.log("Register error: ", err);
      setError(
        err.response.data.message || "Register failed, please try again later"
      );
    }
  };

  return (
    <div className="w-1/3 mx-auto mt-30">
      {error && <p className="text-red-500 italic">{error}</p>}
      {message && <p className="text-green-500 italic">{message}</p>}
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
      <button
        className="bg-teal-500 text-white p-3 w-full rounded mt-10"
        onClick={isRegister ? register : login}
      >
        {isRegister ? "Register" : "Login"}
      </button>

      {isRegister ? (
        <button className="underline mt-2" onClick={() => setIsRegister(false)}>
          Already have an account? Login
        </button>
      ) : (
        <button className="underline mt-2" onClick={() => setIsRegister(true)}>
          No account? Register
        </button>
      )}
    </div>
  );
}
