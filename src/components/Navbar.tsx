import React from 'react'
import { Link } from 'react-router-dom'
// import { createLogicalOr } from 'typescript'

const Navbar = () => {
  return <nav className="navbar" role="navigation" aria-label="main navigation">
    <div className="navbar-menu is-active has-background-dark ">
      <div className="navbar-start pr-6">
        <div className="navbar-item">
          <div className="">
            <div className="level ml-5 mr-5">  
              <p className="text has-text-danger is-size-3">Anime Cue</p>
            </div>
          </div>
          <div className="nav-buttons">
            <Link to="/anime" className="button is-dark has-text-weight-bold">
              Animes
            </Link>
            <Link to="/Createanime" className="button is-dark has-text-weight-bold">
              Create 
            </Link>
            <Link to="/" className="button is-dark has-text-weight-bold">
              Home
            </Link>
            <Link to="/login" className="button is-dark has-text-weight-bold">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  </nav>
}

export default Navbar

