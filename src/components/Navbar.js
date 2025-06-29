// import  React from 'react'
// import {  Link, useLocation, useNavigate } from 'react-router-dom'
 



// const Navbar = () => {
//   let navigate = useNavigate();
//   const handlelogout =()=>{
//     localStorage.removeItem('token');
//     navigate('/login');
//   }
//   let location = useLocation();
   
//   return (

    
//      <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
//   <div className="container-fluid">
//     <Link className="navbar-brand" to="/">iNotebook</Link>
//     <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//       <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarSupportedContent">
//       <ul className="navbar-nav me-auto mb-2 mb-lg-0">
//         <li className="nav-item">
//         <Link className={`nav-link ${location.pathname === "/"? "active ": " "} `} to="/">Home</Link>
//         </li>
//         <li className="nav-item">
//           <Link className={`nav-link ${location.pathname === "/about"? "active" : " "} `} to="/about">About</Link>
//         </li>
         
         
//       </ul>
//       {!localStorage.getItem('token')?<form className="d-flex" >
//         <Link  className = "btn btn-primary mx-1" role='button'  to="/login">Login</Link>
//         <Link  className = "btn btn-primary mx-1" role='button'  to="/signup">SignUp</Link>
//       </form>:<button onClick={handlelogout} className='btn btn-primary'>Logout</button>}
//     </div>
//   </div>
// </nav>
     
//   )
// }

// export default Navbar

import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import "./Navbar.css"; // Include this CSS file

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    // <nav className="neon-navbar">
    //   <div className="neon-container">
    //     <Link className="neon-brand" to="/">iNotebook</Link>
    //     <div className="neon-links">
    //       <Link className={`neon-link ${location.pathname === '/' ? 'active' : ''}`} to="/">Home</Link>
    //       <Link className={`neon-link ${location.pathname === '/about' ? 'active' : ''}`} to="/about">About</Link>
    //     </div>
    //     <div className="neon-auth">
    //       {!localStorage.getItem('token') ? (
    //         <>
    //           <Link className="neon-button" to="/login">Login</Link>
    //           <Link className="neon-button" to="/signup">Sign Up</Link>
    //         </>
    //       ) : (
    //         <button className="neon-button" onClick={handleLogout}>Logout</button>
    //       )}
    //     </div>
    //   </div>
    // </nav>

    <nav className="neon-navbar">
  <div className="neon-container">
    <Link className="neon-brand" to="/">iNotebook</Link>
    
    <div className="neon-links">
      <Link className={`neon-link ${location.pathname === "/" ? "active" : ""}`} to="/">Home</Link>
      <Link className={`neon-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
    </div>

    <div className="neon-auth">
      {!localStorage.getItem('token') ? (
        <>
          <Link className="neon-button" to="/login">Login</Link>
          <Link className="neon-button" to="/signup">Sign Up</Link>
        </>
      ) : (
        <button onClick={handleLogout} className="neon-button">Logout</button>
      )}
    </div>
  </div>
</nav>

  );
};

export default Navbar;
