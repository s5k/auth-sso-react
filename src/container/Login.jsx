import FacebookLogin from "@greatsumini/react-facebook-login";
import { GoogleLogin } from "@react-oauth/google";
import { useState } from "react";

function Login({ setPage }) {
  const [auth, setAuth] = useState({ email: "", password: "" });
  const onUpdateField = (e) => {
    const nextFormState = {
      ...auth,
      [e.target.name]: e.target.value,
    };
    setAuth(nextFormState);
  };
  const loginWithLocal = (e) => {
    e.preventDefault();

    fetch(import.meta.env.VITA_BACKED_URI + "/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(auth),
    }).then((res) => {
      if (res.status !== 201) {
        alert(
          "Login Failed, Please check your email and password. Or you should verify your email"
        );
        return;
      }

      alert("Login Success");
      setPage("dashboard");
    });
  };

  const loginWithFacebook = (response) => {
    const data = {
      accessToken: response.accessToken,
    };
    console.log(data, import.meta.env.VITE_BACKED_URI);
    fetch(import.meta.env.VITE_BACKED_URI + "/auth/facebook-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status !== 201) {
        alert("Login Failed");
        return;
      }

      alert("Login Success");
      setPage("dashboard");
    });
  };

  const loginWithGoogle = (credentialResponse) => {
    console.log(credentialResponse);
    const data = {
      name: "Google",
      type: "web",
      accessToken: credentialResponse.credential,
    };

    fetch(import.meta.env.VITA_BACKED_URI + "/auth/google-login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.status !== 201) {
        alert("Login Failed");
        return;
      }

      alert("Login Success");
      setPage("dashboard");
    });
  };
  return (
    <section className="register-account">
      <div className="signform">
        <div className="left">
          <a
            href="#"
            onClick={() => setPage("register")}
            style={{ float: "right", marginRight: "35px", fontSize: "0.9em" }}
            className="bts-a"
          >
            Don't have an account? Sign up!
          </a>
          <div className="bts">
            <FacebookLogin
              appId={import.meta.env.VITE_FACEBOOK_APPID}
              onSuccess={loginWithFacebook}
            />
            <GoogleLogin
              onSuccess={loginWithGoogle}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </div>
        </div>
        <div className="right">
          <div className="headit">
            <h4>Login To Your Account</h4>
          </div>
          <div className="form">
            <form
              className="login-form"
              id="login-form"
              onSubmit={loginWithLocal}
            >
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
            <a href="#">Forgot your password?</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
