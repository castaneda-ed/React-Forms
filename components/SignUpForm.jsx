import { useState, useEffect } from "react";

export default function SignUpForm({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  async function submitForm(event) {
    event.preventDefault();
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username, password }),
        }
      );

      const parsed = await response.json();
      setToken(parsed.token);
      console.log(parsed);

      if (!response.ok) {
        const parsed = await response.json();
        throw new Error(parsed.error.message || "Something went werong");
      }
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  }

  return (
    <>
      <h2>SignUp</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={submitForm}>
        <label>
          Username :
          <input
            required
            pattern="(?=.*[A-Z]).*"
            minLength={8}
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        {username.length < 8 && (
          <p className="usepass">
            Username needs to be at least 8 characters and have min one
            Uppercase
          </p>
        )}
        <label>
          Password :
          <input
            required
            type="password"
            pattern="(?=.*[A-Z]).*"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        {password.length < 8 && (
          <p className="usepass">
            Passwords must be 8 character long and have min one Upperase
          </p>
        )}
        <input type="submit" value="submit" className="submit" />
      </form>
    </>
  );
}
