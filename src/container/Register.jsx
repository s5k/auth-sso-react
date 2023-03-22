import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

function Register({ setPage }) {
  const [auth, setAuth] = useState({ email: "", password: "" });
  const onUpdateField = (e) => {
    const nextFormState = {
      ...auth,
      [e.target.name]: e.target.value,
    };
    setAuth(nextFormState);
  };

  const registerWithLocal = (e) => {
    e.preventDefault();

    fetch(import.meta.env.VITA_BACKED_URI + "/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    }).then((res) => {
      if (res.status !== 201) {
        alert("Register Failed");
        return;
      }

      alert("Register Success, please verify your email");
      setPage("login");
    });
  };

  return (
    <section className="register-account">
      <div className="signform">
        <div className="right">
          <div className="headit">
            <h4>Register</h4>
          </div>
          <div className="form">
            <form
              className="login-form"
              id="login-form"
              onSubmit={registerWithLocal}
            >
              <input
                type="text"
                placeholder="Email"
                name="username"
                value={auth.username}
                onChange={onUpdateField}
              />

              <input
                type="text"
                placeholder="Email"
                name="email"
                value={auth.email}
                onChange={onUpdateField}
              />

              <input
                type="password"
                placeholder="Password"
                name="password"
                value={auth.password}
                onChange={onUpdateField}
              />
              <input
                className="subbt"
                type="submit"
                defaultValue="Sign In"
                style={{ border: "none" }}
              />
            </form>
            <input type="checkbox" id="remember" name="remember" />
            <span style={{ color: "#b6b6b6", fontSize: "0.9em" }}>
              {" "}
              Remember Me
            </span>
            <a href="#" onClick={() => setPage("login")}>
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
