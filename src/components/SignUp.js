// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import "./Signup.css";  

// const SignUp = (props) => {
//   const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const { name, email, password, cpassword } = credentials;

//     if (password !== cpassword) {
//       props.showAlert("Passwords do not match", "danger");
//       return;
//     }

//     setLoading(true);

//     try {
//       const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/createuser`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           name, email, password
//         }),
//       });
//       const json = await response.json();
//       if (json.Success) {
//         localStorage.setItem("token", json.authtoken);
//         navigate("/");
//         props.showAlert("Account created successfully", "success");
//       } else {
//         props.showAlert("Invalid credentials", "danger");
//       }
//     } catch (error) {
//       console.error("Sign-up error:", error);
//       props.showAlert("Something went wrong. Please try again later.", "danger");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const onChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
//       <div className="card shadow-lg p-4" style={{ maxWidth: '500px', width: '100%' }}>
//         <h3 className="text-center mb-4">Create an Account</h3>
//         <form onSubmit={handleSubmit}>
//           <div className="mb-3">
//             <label htmlFor="name" className="form-label text-dark fw-semibold">Name</label>
//             <input type="text" className="form-control" name='name' id="name" onChange={onChange} required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="email" className="form-label text-dark fw-semibold">Email address</label>
//             <input type="email" className="form-control" name='email' id="email" onChange={onChange} required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="password" className="form-label text-dark fw-semibold">Password</label>
//             <input type="password" name='password' className="form-control" id="password" onChange={onChange} minLength={5} required />
//           </div>
//           <div className="mb-3">
//             <label htmlFor="cpassword" className="form-label text-dark fw-semibold">Confirm Password</label>
//             <input type="password" name='cpassword' className="form-control" id="cpassword" onChange={onChange} minLength={5} required />
//           </div>
//           <div className="d-grid">
//             <button type="submit" className="btn btn-primary" disabled={loading}>
//               {loading ? "Submitting..." : "Sign Up"}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Signup.css";

const SignUp = (props) => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", cpassword: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, cpassword } = credentials;

    if (password !== cpassword) {
      props.showAlert("Passwords do not match", "danger");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/auth/createuser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      const json = await response.json();
      if (json.Success) {
        localStorage.setItem("token", json.authtoken);
        navigate("/");
        props.showAlert("Account created successfully", "success");
      } else {
        props.showAlert("Invalid credentials", "danger");
      }
    } catch (error) {
      console.error("Sign-up error:", error);
      props.showAlert("Something went wrong. Please try again later.", "danger");
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-wrapper">
      <div className="signup-card">
        <h3 className="signup-title">Create an Account</h3>
        <form onSubmit={handleSubmit} className="signup-form">
          <div className="input-group">
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-input" name="name" id="name" onChange={onChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" className="form-input" name="email" id="email" onChange={onChange} required />
          </div>
          <div className="input-group">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-input" name="password" id="password" onChange={onChange} minLength={5} required />
          </div>
          <div className="input-group">
            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-input" name="cpassword" id="cpassword" onChange={onChange} minLength={5} required />
          </div>
          <button type="submit" className="signup-btn" disabled={loading}>
            {loading ? "Submitting..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
