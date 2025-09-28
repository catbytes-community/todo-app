import { useState } from "react";
import { signUp } from "../auth/signUp";
import { confirmSignUp } from "../auth/confirmSignUp";

export default function SignupPage() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [code, setCode] = useState();

  const registerUser = () => {
    console.log("Registering new user with email", email);
    signUp(email, password)
      .then((res) => {
        console.log("signup response", res);
        // user successfully signed up, confirmation code sent
        setIsCodeSent(true);
      })
      .catch((err) => console.log("error registering user", err));
  };

  const confirmEmail = () => {
    console.log("Confirming user email");
    confirmSignUp(email, code)
      .then((res) => {
        console.log("confirm email response", res);
      })
      .catch((err) => console.log("err confirming email", err));
  };

  if (isCodeSent) {
    return (
      <div className="flex flex-col bg-teal-200 w-1/2 m-auto mt-20 p-5 rounded text-center gap-5">
        <h1>Enter confirmation code sent to your email</h1>
        <input
          className="bg-white rounded px-1 py-2"
          placeholder="Email"
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <input
          className="bg-white rounded px-1 py-2"
          placeholder="Confirmation code"
          onChange={(e) => setCode(e.target.value)}
          value={code}
        />
        <button
          className="bg-teal-500 text-white rounded py-2"
          onClick={confirmEmail}
        >
          Sign Up
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col bg-teal-200 w-1/2 m-auto mt-20 p-5 rounded text-center gap-5">
      <h1>Signup for Todo App</h1>
      <input
        className="bg-white rounded px-1 py-2"
        placeholder="Email"
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        className="bg-white rounded px-1 py-2"
        placeholder="Password"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button
        className="bg-teal-500 text-white rounded py-2"
        onClick={registerUser}
      >
        Sign Up
      </button>
    </div>
  );
}
