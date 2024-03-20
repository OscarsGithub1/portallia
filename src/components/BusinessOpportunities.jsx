import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TextField } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import PinOutlinedIcon from '@mui/icons-material/PinOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import Button from '@mui/material/Button'; // Import Button component from Material-UI
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';

function BusinessOpportunities() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    
   

    const opportunities = [
        {
          number: '1',
          company: "ABC Company",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '2',
          company: "Lia",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '1',
          company: "ABC Company",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '2',
          company: "Lia",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '1',
          company: "ABC Company",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '2',
          company: "Lia",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '1',
          company: "ABC Company",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '2',
          company: "Lia",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '1',
          company: "ABC Company",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '2',
          company: "Lia",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '1',
          company: "ABC Company",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '2',
          company: "Lia",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '1',
          company: "ABC Company",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },
        {
          number: '2',
          company: "Lia",
          description: "Sample description 1",
          orderDate: "2023-05-15",
          totalvärde: "$1000",
          pipelinelevel: '1',
          responsible: 'Jane Smith',
        },

        // Add more opportunities here...
    ];

    const opportunitiesPerPage = 10; // Maximum 10 items per page
    const pageCount = Math.ceil(opportunities.length / opportunitiesPerPage);
  
    const startIndex = (currentPage - 1) * opportunitiesPerPage;
    const visibleOpportunities = opportunities.slice(startIndex, startIndex + opportunitiesPerPage);

    const filteredOpportunities = visibleOpportunities.filter(opportunity => {
      const companyMatch = opportunity.company.toLowerCase().includes(searchQuery.toLowerCase());
      const descriptionMatch = opportunity.description.toLowerCase().includes(searchQuery.toLowerCase());
      const numberMatch = opportunity.number.toLowerCase().includes(searchQuery.toLowerCase());
      return companyMatch || descriptionMatch || numberMatch;
    });
    
    
  
    const handleChangePage = (event, page) => {
      setCurrentPage(page);
    };

    const handleSearchChange = (event) => {
      const query = event.target.value;
      console.log("Search Query:", query);
      setSearchQuery(query);
    };
    

    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
          <div style={{ width: '90%', position: 'relative' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <AssignmentOutlinedIcon fontSize="large" style={{ marginRight: '10px', verticalAlign: 'middle' }} />
                <h3 style={{ margin: '0' }}>Förfrågningar</h3>
              </div>
              <div style={{ display: 'flex', alignItems: 'center' }}> {/* This div contains both the search field and the "Skapa Förfrågan" button */}
                <Tooltip title="Sökfält: Företagsnamn, Beskrivning, Nummer" placement="bottom">
                  <TextField
                    placeholder="Sök..."
                    variant="outlined"
                    size="small"
                    style={{ backgroundColor: 'white', marginRight: '25px', width: '180px' }} // Adjusted marginRight
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
                  component={Link}
                  to="/addopportunity"
                  variant="contained"
                  color="primary"
                  style={{ backgroundColor: 'white', color: 'black', fontWeight: 'bold', borderRadius: '6px' }}
                  startIcon={<PostAddOutlinedIcon />}
                >
                Skapa förfrågan
                </Button>
              </div>
            </div>
            <TableContainer component={Paper} elevation={10} sx={{ borderRadius: '8px', height: '588px', maxHeight: '650px', overflowY: 'auto', marginTop: '15px' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                  <TableCell sx={{ px: '30px', width: '5%', fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <NumbersOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                      Nummer
                    </div>
                  </TableCell>
                  <TableCell sx={{ px: '10px', width: '10%', fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <WorkOutlineOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                      Företagsnamn
                    </div>
                  </TableCell>
                  <TableCell sx={{ px: '10px', width: '10%', fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <DescriptionOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                      Beskrivning
                    </div>
                  </TableCell>
                  <TableCell sx={{ px: '50px', width: '10%', fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <EventOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                      Datum
                    </div>
                  </TableCell>
                  <TableCell sx={{ px: '10px', width: '10%', fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <NumbersOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                      Totalvärde
                    </div>
                  </TableCell>
                  <TableCell sx={{ px: '10px', width: '10%', fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <PinOutlinedIcon fontSize="medium" sx={{ marginRight: '5px' }} />
                      Pipelinenivå
                    </div>
                  </TableCell>
                  <TableCell sx={{ px: '10px', width: '10%', fontWeight: 'bold' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                      <AccountBoxOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                      Ansvarig
                    </div>
                  </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredOpportunities.map((opportunity) => (
                    <TableRow key={opportunity.number} component={Link} to={`/businessdetailed/${opportunity.company}`} style={{ textDecoration: 'none', cursor: 'pointer' }} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }} >
                      <TableCell sx={{ px: '35px', width: '8%' }}>{opportunity.number}</TableCell>
                      <TableCell sx={{ px: '10px', width: '8%' }}>{opportunity.company}</TableCell>
                      <TableCell sx={{ px: '10px', width: '8%' }}>{opportunity.description}</TableCell>
                      <TableCell sx={{ px: '50px', width: '8%' }}>{opportunity.orderDate}</TableCell>
                      <TableCell sx={{ px: '30px', width: '8%' }}>{opportunity.totalvärde}</TableCell>
                      <TableCell sx={{ px: '30px', width: '8%' }}>{opportunity.pipelinelevel}</TableCell>
                      <TableCell sx={{ px: '15px', width: '8%' }}>{opportunity.responsible}</TableCell>
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
}    

export default BusinessOpportunities;
