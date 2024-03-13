import React, { useState } from 'react';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, TextField} from '@mui/material';
import { Link } from 'react-router-dom'; // Assuming you are using React Router
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import NumbersOutlinedIcon from '@mui/icons-material/NumbersOutlined';
import AccountBoxOutlinedIcon from '@mui/icons-material/AccountBoxOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import CheckBoxOutlinedIcon from '@mui/icons-material/CheckBoxOutlined';
import CasesOutlinedIcon from '@mui/icons-material/CasesOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';

function CompanyList() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Define hardcoded company data
  const companies = [
    {
      company: 'ABC Company',
      status: 'B-Kund',
      type: 'Public',
      responsible: 'John Doe',
      postalCity: 'New York',
      organizationNumber: '1234567890'
    },
    {
      company: 'XYZ Corporation',
      status: 'A-Kund',
      type: 'Private',
      responsible: 'Jane Smith',
      postalCity: 'Los Angeles',
      organizationNumber: '0987654321'
    },



    // Add more companies as needed
  ];

  // Calculate pagination
  const companiesPerPage = 10;
  const pageCount = Math.ceil(companies.length / companiesPerPage);

  // Get companies for the current page
  const startIndex = (currentPage - 1) * companiesPerPage;
  const visibleCompanies = companies.slice(startIndex, startIndex + companiesPerPage);

  const filteredCompanies = companies
  .filter(company => {
    const companyMatch = company.company.toLowerCase().includes(searchQuery.toLowerCase());
    const ResponsibleMatch = company.responsible.toLowerCase().includes(searchQuery.toLowerCase());
    return companyMatch || ResponsibleMatch; 
  })
  .slice(startIndex, startIndex + companiesPerPage);


  const handleChangePage = (event, page) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (event) => {
    const query = event.target.value;
    console.log("Search Query:", query);
    setSearchQuery(query);
  };

    /*function CompanyList() {
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchCompanies = async () => {
        try {
          const response = await axios.get('https://localhost:7042/api/Companies');
          setCompanies(response.data);
        } catch (error) {
          console.error('Error fetching companies:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchCompanies();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    } */

    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
        <div style={{ width: '90%', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <CasesOutlinedIcon fontSize="large" style={{ marginRight: '10px', verticalAlign: 'middle' }} />
              <h3 style={{ margin: '0' }}>Företag</h3>
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Sökfält: Företagsnamn, Ansvarig" placement="bottom">
                <TextField
                  placeholder="Sök..."
                  variant="outlined"
                  size="small"
                  style={{ backgroundColor: 'white', width: '180px' }}
                  InputProps={{
                    startAdornment: (
                      <SearchIcon style={{ color: 'black', marginRight: '5px' }} />
                    ),
                  }}
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
              </Tooltip>
            </div>
          </div>
          <TableContainer component={Paper} elevation={10} sx={{ borderRadius: '18px', height: '650px', marginTop: '15px' }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                <TableCell sx={{ px: '50px', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <WorkOutlineOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    Företagsnamn
                  </div>
                </TableCell>
                <TableCell sx={{ px: '50px', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <CheckBoxOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    Status
                  </div>
                </TableCell>
                <TableCell sx={{ px: '50px', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <StyleOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    Typ
                  </div>
                </TableCell>
                <TableCell sx={{ px: '50px', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <AccountBoxOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    Ansvarig
                  </div>
                </TableCell>
                <TableCell sx={{ px: '50px', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <PlaceOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    Postort
                  </div>
                </TableCell>
                <TableCell sx={{ px: '50px', fontWeight: 'bold' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <NumbersOutlinedIcon fontSize="small" sx={{ marginRight: '5px' }} />
                    Organisationsnummer
                  </div>
                </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredCompanies.map((company) => (
                  <TableRow key={company.company} component={Link} to={`/dealsdetailed/${company.company}`} style={{ textDecoration: 'none', cursor: 'pointer' }} sx={{ '&:hover': { backgroundColor: '#f5f5f5' } }} >
                    <TableCell sx={{ px: '50px' }}>{company.company}</TableCell>
                    <TableCell sx={{ px: '50px' }}>{company.status}</TableCell>
                    <TableCell sx={{ px: '50px' }}>{company.type}</TableCell>
                    <TableCell sx={{ px: '50px' }}>{company.responsible}</TableCell>
                    <TableCell sx={{ px: '50px' }}>{company.postalCity}</TableCell>
                    <TableCell sx={{ px: '50px' }}>{company.organizationNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <div style={{ position: 'relative', bottom: '45px', display: 'flex', justifyContent: 'center' }}>
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

export default CompanyList;
