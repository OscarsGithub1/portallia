import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/images/Meone_payoff_grey.png';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { MdOutlineSettings } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { Dropdown } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <Paper elevation={5}>
      <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#FFFFFF'}}>
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            <img src={Logo} alt="Logo" style={{ maxHeight: '40px', marginLeft: '50px' }} />
          </a>

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

          <div className="collapse navbar-collapse" id="navbarNav">
            <div className="navbar-nav col-auto">
              <a className="nav-link border-right" href="/business-opportunities" style={{ fontSize: '1.4rem', marginLeft: '10px' }}>
                Affärsmöjligheter
              </a>
              <a className="nav-link border-right" href="/deals" style={{ fontSize: '1.4rem', marginLeft: '10px' }}>
                Avtal
              </a>
            </div>

            <div style={{ marginRight: '20px' }} className="navbar-nav ms-auto">
              <Dropdown>
                <Dropdown.Toggle onClick={toggleDropdown} className="dropdown-toggle">
                  <Avatar src="/broken-image.jpg" />
                </Dropdown.Toggle>
                <Dropdown.Menu show={isDropdownOpen}>
                  <Dropdown.Item href="/profile">
                    <HiOutlineUserCircle className="me-2" />
                    Min profil
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#">
                    <FiLogOut className="me-2" />
                    Logga ut
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </div>
          </div>
        </div>
        <style>
          {`
            .dropdown-toggle {
              background-color: transparent !important;
              border: none !important;
            }

            .dropdown-toggle::after {
              display: none !important;
            }

            .nav-link:hover {
              color: black !important;
            }
            
            .vertical-line {
              border-left: 1px solid #ddd;
              height: 40px;
              margin: 0 10px;
            }
          `}
        </style>
      </nav>
    </Paper>
  );
};

export default Navbar;
