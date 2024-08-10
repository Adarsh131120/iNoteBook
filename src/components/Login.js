import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";

const Login = (props) => {

  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // const location = useLocation();
  // const from = location.state?.from?.pathname || "/";
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!credentials.email || !credentials.password) {
      props.showAlert("Please fill in all fields", "danger");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: credentials.email,
          password: credentials.password,
        }),
      });

      const json = await response.json();
      console.log(json);
      if (json.Success) {
        localStorage.setItem("token", json.authtoken);
        props.showAlert("Logged in successfully", "success");
        navigate("/", { replace: true });
      } else {
        props.showAlert("Invalid details", "danger");
      }
    } catch (error) {
      console.error("Login error:", error);
      props.showAlert("Something went wrong. Please try again later.", "danger");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="mt-3">
      <h2>Login to Continue to iNoteBook</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            value={credentials.email}
            onChange={onChange}
            className="form-control"
            id="email"
            name="email"
            aria-describedby="emailHelp"
            required
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={credentials.password}
            onChange={onChange}
            className="form-control"
            name="password"
            id="password"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default Login;
