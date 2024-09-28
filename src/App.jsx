import { useState } from "react";
import "./App.css";
import SignUpForm from "../components/SignUpForm";
import Authenticate from "../AuthenticateForm";

export default function App() {
  const [token, setToken] = useState(null);
  return (
    <div className="formContainer">
      <SignUpForm token={token} setToken={setToken} />
      <Authenticate token={token} setToken={setToken} />
    </div>
  );
}
