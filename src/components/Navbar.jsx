import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Logo from '../assets/images/Meone_payoff_grey.png';
import { HiOutlineUserCircle } from 'react-icons/hi';
import { MdOutlineSettings } from 'react-icons/md';
import { FiLogOut } from 'react-icons/fi';
import { Dropdown } from 'react-bootstrap';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

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
                Förfrågningar
              </a>
              <a className="nav-link border-right" href="/deals" style={{ fontSize: '1.4rem', marginLeft: '10px' }}>
                Uppdrag
              </a>
              <a className="nav-link border-right" href="/document" style={{ fontSize: '1.4rem', marginLeft: '10px' }}>
                TestförOscar
              </a>
            </div>

            <div style={{ marginRight: '20px', display: 'flex', alignItems: 'center' }} className="navbar-nav ms-auto">
              <span>Guide</span>
              <IconButton
                aria-label="information"
                aria-describedby="information-popover"
                onClick={handlePopoverOpen}
                style={{ marginRight: '10px' }}
              >
                <InfoOutlinedIcon />
              </IconButton>
              <Popover
                id="information-popover"
                open={open}
                anchorEl={anchorEl}
                onClose={handlePopoverClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                <div style={{ padding: '20px' }}>
                  <h4>Information</h4>
                  <p>This is some information you want to display.</p>
                </div>
              </Popover>
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
