import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import { TableContainer, TextField, Divider, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, Menu, MenuItem } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AssignmentTurnedInOutlinedIcon from '@mui/icons-material/AssignmentTurnedInOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';



const Deals = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);

  // Hardcoded sample data for demonstration
  const tasks = [
    {
      company: "ABC Company",
      status: "Ny",
      description: "Sample 3",
      orderDate: "2023-05-15",
      number: "1",
      totalvärde: "$1000",
      avtalAnsvarig: "Avtal Ansvarig",
      avtalKontakt: "Avtal Kontakt"
    },
    {
      company: "ABC Company",
      status: "Avslutad",
      description: "Sample 2",
      orderDate: "2023-05-15",
      number: "2",
      totalvärde: "$1000",
      avtalAnsvarig: "Avtal Ansvarig",
      avtalKontakt: "Avtal Kontakt"
    },
    {
      company: "XYZ Company",
      status: "Förlängd",
      description: "Sample",
      orderDate: "2023-05-15",
      number: "3",
      totalvärde: "$1000",
      avtalAnsvarig: "Avtal Ansvarig",
      avtalKontakt: "Simon Simonsson"
    },
    // Add more sample data as needed
  ];

  // Calculate pagination
  const tasksPerPage = 10;
  const pageCount = Math.ceil(tasks.length / tasksPerPage);

  // Get companies for the current page
  const startIndex = (currentPage - 1) * tasksPerPage;
  const visibleTask = tasks.slice(startIndex, startIndex + tasksPerPage);

  // Filter tasks based on status and search query
  const filteredTasks = visibleTask.filter(task => {
    const companyMatch = task.company.toLowerCase().includes(searchQuery.toLowerCase());
    const descriptionMatch = task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const numberMatch = task.number.toLowerCase().includes(searchQuery.toLowerCase());
    const statusMatch = statusFilter === '' || task.status === statusFilter; // Check if the task status matches the selected filter
    return (companyMatch || descriptionMatch || numberMatch) && statusMatch; // Ensure both search and status filters are applied
  });


  const getStatusColor = (status) => {
    switch (status) {
      case 'Ny':
        return '#00FF00'; // Green color for "Nya"
      case 'Förlängd':
        return '#0000FF'; // Blue color for "Förlängda"
      case 'Avslutad':
        return '#FF0000'; // Red color for "Avslutade"
      default:
        return '#FFFFFF'; // Default color
    }
  };
  

  // Change page
  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  // Handle filter click
  const handleFilterClick = (status) => {
    setStatusFilter(status);
    setAnchorEl(null); // Close the dropdown menu after selecting an option
  };

  // Handle search query change
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Open the dropdown menu
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Close the dropdown menu
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
      <div style={{ width: '90%', position: 'relative' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <AssignmentTurnedInOutlinedIcon fontSize="large" style={{ marginRight: '10px', verticalAlign: 'middle' }} />
              <h3 style={{ margin: '0' }}>Avtal</h3>
          </div>
          <div>
            <div>
              <Tooltip title="Sökfält: Företagsnamn, Beskrivning, Nummer" placement="bottom">
                <TextField
                  placeholder="Sök..."
                  variant="outlined"
                  size="small"
                  style={{ backgroundColor: 'white', marginRight: '25px', width: '180px' }}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon style={{ color: 'black', marginRight: '5px' }} />
                    ),
                  }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Tooltip>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleMenuOpen} 
                startIcon={<FilterListOutlinedIcon style={{ color: 'black' }} />}
                style={{ color: 'black', backgroundColor: 'white', borderRadius: '6px', fontWeight: 'bold', marginLeft: '10px' }}
              >
                Filtrera
              </Button>
            </div>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleFilterClick('')}>Alla</MenuItem>
              <Divider />
              <MenuItem onClick={() => handleFilterClick('Ny')}>Ny</MenuItem>
              <Divider />
              <MenuItem onClick={() => handleFilterClick('Förlängd')}>Förlängd</MenuItem>
              <Divider />
              <MenuItem onClick={() => handleFilterClick('Avslutad')}>Avslutad</MenuItem>
            </Menu>
          </div>
        </div>
        <TableContainer component={Paper} elevation={10} sx={{ borderRadius: '8px', height: '588px', maxHeight: '650px', overflowY: 'auto', marginTop: '15px'}}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell sx={{  px: '15px', width: '5%', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckBoxOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    Status
                  </div>
                </TableCell>
                <TableCell sx={{ px: '15px', width: '5%', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <WorkOutlineOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    Företagsnamn
                  </div>
                </TableCell>
                <TableCell sx={{  px: '15px', width: '10%', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <DescriptionOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    Beskrivning
                  </div>
                </TableCell>
                <TableCell sx={{  px: '20px', width: '5%', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <EventOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    Datum
                  </div>
                </TableCell>
                <TableCell sx={{  px: '20px', width: '5%', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <NumbersOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    Nummer
                  </div>
                </TableCell>
                <TableCell sx={{  px: '10px', width: '5%', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <NumbersOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    Totalvärde
                  </div>
                </TableCell>
                <TableCell sx={{  px: '10px', width: '8%', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <AccountBoxOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    Ansvarig
                  </div>
                </TableCell>
                <TableCell sx={{  px: '10px', width: '8%', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <AccountBoxOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    Kontakt
                  </div>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTasks.map((task, index) => (
                <TableRow key={index} component={Link} to={`/deliveries/${task.company}`} style={{ textDecoration: 'none', cursor: 'pointer' }} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }}>
                  <TableCell sx={{ px: '20px', width: '5%', position: 'relative' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <div style={{ position: 'absolute', left: 0, top: 0, backgroundColor: getStatusColor(task.status), width: '10px', height: '100%' }}></div>
                      {task.status}
                    </div>
                  </TableCell>
                  <TableCell sx={{ px: '15px', width: '5%' }}>{task.company}</TableCell>
                  <TableCell sx={{ px: '20px', width: '5%' }}>{task.description}</TableCell>
                  <TableCell sx={{ px: '20px', width: '5%' }}>{new Date(task.orderDate).toLocaleDateString()}</TableCell>
                  <TableCell sx={{ px: '50px', width: '5%' }}>{task.number}</TableCell>
                  <TableCell sx={{ px: '20px', width: '5%' }}>{task.totalvärde}</TableCell>
                  <TableCell sx={{ px: '10px', width: '8%' }}>{task.avtalAnsvarig}</TableCell>
                  <TableCell sx={{ px: '15px', width: '8%' }}>{task.avtalKontakt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <div style={{ 
              backgroundColor: 'white', 
              borderRadius: '8px', 
              display: 'flex', 
              justifyContent: 'center', 
              boxShadow: '0px 0px 2px rgba(0, 0, 0, 0.6)' 
            }}>
              <Pagination
                count={pageCount}
                page={currentPage}
                onChange={handleChangePage}
                renderItem={(item) => (
                  <PaginationItem
                    slots={{ previous: ArrowBackIcon, next: ArrowForwardIcon }}
                    {...item}
                  />
                )}
              />
            </div>
      </div>
    </div>
  );
};

export default Deals;