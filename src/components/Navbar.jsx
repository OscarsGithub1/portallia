import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/images/meone_payoff_grey.jpg';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { VscHistory } from 'react-icons/vsc';
import { GrNotification } from 'react-icons/gr';
import { MdOutlineSettings } from 'react-icons/md';
import { IoAccessibilitySharp } from 'react-icons/io5';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img src={Logo} alt="Logo" style={{ maxHeight: '50px' }} />
        </a>

        {/* Navbar Toggler for Small Screens */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Left-side Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="navbar-nav me-auto">
            <a className="nav-link" href="/companies">
              Företag
            </a>
            <a className="nav-link" href="#">
              Aktiviteter
            </a>
            <a className="nav-link" href="/business-opportunities">
              Affärsmöjligheter
            </a>
            <a className="nav-link" href="/deals">
              Avtal
            </a>
            <a className="nav-link" href="#">
              Kalender
            </a>
          </div>

         

          {/* Right-side Links */}
          <div className="navbar-nav ms-auto">

                {/* Search Bar */}
                <form className="d-flex ml-3">
            <input
              className="form-control"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-success ml-2" type="submit">
              Search
            </button>
          </form>
          <a className="nav-link" href="#" style={{ marginRight: '8px' }}>
              <HiOutlineUserCircle className="fs-3" />
            </a>
            <a className="nav-link" href="#" style={{ marginRight: '8px' }}>
              <VscHistory className="fs-3" />
            </a>
            <a className="nav-link" href="#" style={{ marginRight: '8px' }}>
              <GrNotification className="fs-3" />
            </a>
            <a className="nav-link" href="#" style={{ marginRight: '8px' }}>
              <MdOutlineSettings className="fs-3" />
            </a>
            <a className="nav-link" href="#" style={{ marginRight: '8px' }}>
              <IoAccessibilitySharp className="fs-3" />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
