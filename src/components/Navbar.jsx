import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/images/Meone_payoff_grey.png';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { MdOutlineSettings } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi'; // Importing the FiLogOut icon
import { Dropdown } from 'react-bootstrap';

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        {/* Logo */}
        <a className="navbar-brand" href="/">
          <img src={Logo} alt="Logo" style={{ maxHeight: '50px', marginLeft: '50px' }} />
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
          <div className="navbar-nav col-auto">
            <a className="nav-link" href="/companies" style={{ color: 'white', fontSize: '1.2rem', marginLeft: '50px' }}>
              Företag
            </a>
            <a className="nav-link border-right" href="#" style={{ color: 'white', fontSize: '1.2rem', marginLeft: '10px' }}>
              Aktiviteter
            </a>
            <a className="nav-link border-right" href="/business-opportunities" style={{ color: 'white', fontSize: '1.2rem', marginLeft: '10px' }}>
              Affärsmöjligheter
            </a>
            <a className="nav-link border-right" href="/deals" style={{ color: 'white', fontSize: '1.2rem', marginLeft: '10px' }}>
              Avtal
            </a>
            <a className="nav-link" href="/document" style={{ color: 'white', fontSize: '1.2rem', marginLeft: '10px' }}>
              Dokument
            </a>
          </div>

          {/* Right-side Links */}
          <div className="navbar-nav ms-auto">

            {/* User Dropdown Menu */}
            <Dropdown>
              <Dropdown.Toggle variant="link" id="dropdown-basic">
                <HiOutlineUserCircle className="fs-2" style={{ color: 'white' }} />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/profile">
                  <HiOutlineUserCircle className="me-2" />
                  Visa profil
                </Dropdown.Item>
                <Dropdown.Item href="#">
                  <MdOutlineSettings className="me-2" />
                  Inställningar
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item href="#">
                  <FiLogOut className="me-2" /> {/* Replaced with FiLogOut icon */}
                  Logga ut
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
