import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, Button, Typography, CircularProgress, Dialog, DialogTitle, DialogContent } from '@mui/material';

const OpportunitiesByPersonAndPipeline = () => {
  const [opportunities, setOpportunities] = useState([]);
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const token = localStorage.getItem('token');
  const personId = localStorage.getItem('PersonId');

  useEffect(() => {
    const fetchOpportunities = async () => {
      let page = 1;
      let hasMorePages = true;
  
      if (!personId || !token) {
        setError('Required information not found. Please ensure you are logged in and try again.');
        setLoading(false);
        return;
      }
  
      while (hasMorePages) {
        try {
          const response = await axios.get(`https://api.webcrm.com/Opportunities/ByPipelineLevel/13`, {
            params: { Page: page, Size: 50, include: 'SecurityInfo' },
            headers: { 'Authorization': `Bearer ${token}`, 'Accept': 'application/json' },
          });
  
          if (response.data && response.data.length > 0) {
            setOpportunities(prev => [...prev, ...response.data.filter(opportunity => opportunity.OpportunityPersonId.toString() === personId)]);
            page++;
          } else {
            hasMorePages = false;
          }
        } catch (fetchError) {
          console.error('Error fetching opportunities:', fetchError);
          setError('Failed to fetch opportunities.');
          hasMorePages = false;
        }
      }
      setLoading(false);
    };
  
    fetchOpportunities();
  }, [personId, token]);
  const openDetailsDialog = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setIsDialogOpen(true);
  };

  const renderOpportunityDetailsDialog = () => (
    <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} maxWidth="md" fullWidth>
      <DialogTitle>Opportunity Details</DialogTitle>
      <DialogContent>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Field</TableCell>
              <TableCell>Value</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedOpportunity && Object.entries(selectedOpportunity).map(([key, value]) => (
              <TableRow key={key}>
                <TableCell>{key}</TableCell>
                <TableCell>{typeof value === 'object' ? JSON.stringify(value, null, 2) : value.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </DialogContent>
    </Dialog>
  );

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <TableContainer component={Paper} className="mt-3">
      {/* Table structure for opportunities */}
      {opportunities.map((opportunity) => (
        <Button key={opportunity.OpportunityId} onClick={() => openDetailsDialog(opportunity)}>View Details</Button>
      ))}
      {renderOpportunityDetailsDialog()}
    </TableContainer>
  );
};

export default OpportunitiesByPersonAndPipeline;
