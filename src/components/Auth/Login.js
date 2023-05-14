import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  var navigate = useNavigate();
  const submit = (event) => {
    event.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        navigate("/home");
      })
      .catch((error) => {
        console.error(error);
        alert(error.message);
      });
  };
  return (
    <div>
      <section className="login-container">
        <article className="form-container">
          <div className="intro">
            <h1>Welcome Back</h1>
            <p>Welcome Back, Please Enter Your details</p>
          </div>

          <form onSubmit={submit} className="form">
            <div className="email-input">
              <span className="material-icons-round icon-size">
                {" "}
                <FontAwesomeIcon icon={faEnvelope} />{" "}
              </span>
              <span id="seperator"></span>
              <div className="input-container">
                <p className="sub-title">Email Address</p>
                <input
                  type="email"
                  name="usermail"
                  id="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="email-input">
              <span className="material-icons-round icon-size">
                {" "}
                <FontAwesomeIcon icon={faLock} />{" "}
              </span>
              <span id="seperator"></span>
              <div className="input-container">
                <p className="sub-title">Password</p>
                <input
                  type="password"
                  name="userpass"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button id="submit">Continue</button>
          </form>

          <article className="outro">
            <div className="router">
              You have not accaunt<Link to="/sign"> Sign</Link>
            </div>
            <div className="ending">
              <p>Or Continue With</p>
            </div>

            <div className="socials">
              <a className="social-btn" href="/" id="g-btn">
                <p>Google</p>
              </a>
              <a className="social-btn" href="/" id="a-btn">
                <p>Apple</p>
              </a>
              <a className="social-btn" href="/" id="fb-btn">
                <p>Facebook</p>
              </a>
            </div>
          </article>
        </article>
        <article className="login-side-bg"></article>
      </section>
    </div>
  );
}

export default Login;
