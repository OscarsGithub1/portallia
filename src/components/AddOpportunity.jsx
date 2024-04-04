import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Card } from 'react-bootstrap';
import { Paper } from '@mui/material';
import RequestQuoteOutlinedIcon from '@mui/icons-material/RequestQuoteOutlined';
import { useHistory } from 'react-router-dom';

const OpportunityForm = () => {
  const [formData, setFormData] = useState({
    OpportunityAssignedTo: 0,
    OpportunityAssignedTo2: 0,
    OpportunityComment: '',
    OpportunityCreatedAt: '',
    OpportunityCreatedBy: '',
    OpportunityCurrencyName: '',
    OpportunityCurrencySymbol: '',
    OpportunityDescription: '',
    OpportunityDiscount: 0,
    OpportunityErpId: '',
    OpportunityErpReadOnly: false,
    OpportunityErpStatus: '',
    OpportunityErpSyncDateTime: '',
    OpportunityGmRevenue1: 0,
    OpportunityOrganisationId: 0,
    OpportunityPercent: 0,
    OpportunityPersonId: 0,
    OpportunityPersonId2: 0,
    OpportunityAddress: '',
    OpportunityPostCode: '',
    OpportunityCity: '',
    OpportunityState: '',
    OpportunityCountryValue: '',
    OpportunityCountry: {
      Name: '',
      CodeISO: '',
      CodeUN: null, // explicitly setting as null based on your requirement
    },
    OpportunityProduct: '',
    OpportunityProductId: 0,
    OpportunityQuotationLanguageId: 0,
    OpportunityRevenue1: 0,
    OpportunitySearch1: '',
    OpportunitySearch2: '',
    OpportunitySpentTime: '',
    OpportunityUpdatedAt: '',
    OpportunityUpdatedBy: '',
    OpportunityUserGroupId: 0,
    OpportunityWinPercent: 0,
    OpportunityWinPercent2: 0,
    OpportunityWinYesNo: false,
    OpportunityMemo: '',
    OpportunityCustom1: '',
    OpportunityCustom2: '',
    OpportunityCustom3: '',
    OpportunityCustom4: '',
    OpportunityCustom6: '',
    OpportunityCustom7: '',
    OpportunityCustom8: '',

    //checka att alla kalender fields har rätt datatype
    OpportunityLevel: 0,
    OpportunityPipelineType: 0,
    OpportunityLevelText: '',
    OpportunityLostDate: '',
    OpportunityNextFollowUp: '',
    OpportunityNumber: '',
    OpportunityOrderDate: '',
    OpportunityOrganisationId: 0,
    OpportunityId: 0,
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
  
    if (!token) {
      console.error("No token found in localStorage.");
      return; // Optionally, show an error message to the user.
    }
  
    try {
      const response = await axios.post('https://api.webcrm.com/Opportunities', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      console.log('Opportunity created:', response.data);
      
      // Clear the form fields by resetting formData state to its initial state
      setFormData({
        OpportunityAssignedTo: 0,
        OpportunityAssignedTo2: 0,
        OpportunityComment: '',
        OpportunityCreatedAt: '',
        OpportunityCreatedBy: '',
        OpportunityCurrencyName: '',
        OpportunityCurrencySymbol: '',
        OpportunityDescription: '',
        OpportunityDiscount: 0,
        OpportunityErpId: '',
        OpportunityErpReadOnly: false,
        OpportunityErpStatus: '',
        OpportunityErpSyncDateTime: '',
        OpportunityGmRevenue1: 0,
        OpportunityOrganisationId: 0,
        OpportunityPercent: 0,
        OpportunityPersonId: 0,
        OpportunityPersonId2: 0,
        OpportunityAddress: '',
        OpportunityPostCode: '',
        OpportunityCity: '',
        OpportunityState: '',
        OpportunityCountryValue: '',
        OpportunityCountry: {
          Name: '',
          CodeISO: '',
          CodeUN: null,
        },
        OpportunityProduct: '',
        OpportunityProductId: 0,
        OpportunityQuotationLanguageId: 0,
        OpportunityRevenue1: 0,
        OpportunitySearch1: '',
        OpportunitySearch2: '',
        OpportunitySpentTime: '',
        OpportunityUpdatedAt: '',
        OpportunityUpdatedBy: '',
        OpportunityUserGroupId: 0,
        OpportunityWinPercent: 0,
        OpportunityWinPercent2: 0,
        OpportunityWinYesNo: false,
        OpportunityMemo: '',
        OpportunityCustom1: '',
        OpportunityCustom2: '',
        OpportunityCustom3: '',
        OpportunityCustom4: '',
        OpportunityCustom6: '',
        OpportunityCustom7: '',
        OpportunityCustom8: '',
        OpportunityLevel: 0,
        OpportunityPipelineType: 0,
        OpportunityLevelText: '',
        OpportunityLostDate: '',
        OpportunityNextFollowUp: '',
        OpportunityNumber: '',
        OpportunityOrderDate: '',
        OpportunityOrganisationId: 0,
        OpportunityId: 0,
      });
  
      // Optionally, navigate to a different page or show a success message
    } catch (error) {
      console.error('Error creating opportunity:', error.response);
      // Handle the error, e.g., setting an error message
    }
  };
  const handleCancel = () => {
    // Navigate back to the previous page
    history.goBack();
  };
  
  const history = useHistory();

  // The return statement with form inputs remains the same, adjust type="text" to type="number" where applicable
  // For date inputs, use type="datetime-local" and handleDateChange for onChange
  // For checkboxes, use checked attribute and handleInputChange for onChange

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <div style={{ margin: '50px' }}>        
        <Paper elevation={10} style={{ width: '110%', padding: '30px', borderRadius: '18px'}}>
          <Card.Body>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
              <RequestQuoteOutlinedIcon fontSize="large" style={{ marginRight: '15px', verticalAlign: 'middle' }} />
              <h3 style={{ margin: '0' }}>Skapa en förfrågan</h3>
            </div>
        <Form onSubmit={handleSubmit}>
          {/* 
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityAssignedTo">Assigned To:</Form.Label>
            <Form.Control
              type="number"
              id="OpportunityAssignedTo"
              name="OpportunityAssignedTo"
              value={formData.OpportunityAssignedTo}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityAssignedTo2">Assigned To2:</Form.Label>
            <Form.Control
              type="number"
              id="OpportunityAssignedTo2"
              name="OpportunityAssignedTo2"
              value={formData.OpportunityAssignedTo2}
              onChange={handleInputChange}
            />
            
          </Form.Group>
          
        </div>
      </div>
      */}
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityComment">Comment:</Form.Label>
            <Form.Control
            type="text"
            id="OpportunityComment"
            name="OpportunityComment"
            value={formData.OpportunityComment}
            onChange={handleInputChange}
            />
          </Form.Group>
        </div>
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityCreatedAt">Created At:</Form.Label>
            <Form.Control
              type="datetime-local"
              id="OpportunityCreatedAt"
              name="OpportunityCreatedAt"
              value={formData.OpportunityCreatedAt}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityCreatedBy">Created By:</Form.Label>
            <Form.Control
            type="text"
            id="OpportunityCreatedBy"
            name="OpportunityCreatedBy"
            value={formData.OpportunityCreatedBy}
            onChange={handleInputChange}
            />
          </Form.Group>
        </div>
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityCurrencyName">Currency Name:</Form.Label>
            <Form.Control
            type="text"
            id="OpportunityCurrencyName"
            name="OpportunityCurrencyName"
            value={formData.OpportunityCurrencyName}
            onChange={handleInputChange}
          />
        </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityCurrencySymbol">Currency Symbol:</Form.Label>
            <Form.Control
              type="text"
              id="OpportunityCurrencySymbol"
              name="OpportunityCurrencySymbol"
              value={formData.OpportunityCurrencySymbol}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityDescription">Description:</Form.Label>
            <Form.Control
              as="textarea" rows={3}
              id="OpportunityDescription"
              name="OpportunityDescription"
              value={formData.OpportunityDescription}
              onChange={handleInputChange}
              />
          </Form.Group>
        </div>
      </div>
      {/*}
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityDiscount">Discount:</Form.Label>
            <Form.Control
              type="number"
              id="OpportunityDiscount"
              name="OpportunityDiscount"
              value={formData.OpportunityDiscount}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityErpId">ERP ID:</Form.Label>
            <Form.Control
              type="text"
              id="OpportunityErpId"
              name="OpportunityErpId"
              value={formData.OpportunityErpId}
              onChange={handleInputChange}
            />
            </Form.Group>
        </div>
      </div>
      
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityErpReadOnly">ERP Read Only:</Form.Label>
            <Form.Control
              type="text"
              id="OpportunityErpReadOnly"
              name="OpportunityErpReadOnly"
              checked={formData.OpportunityErpReadOnly}
              onChange={(e) => setFormData({ ...formData, OpportunityErpReadOnly: e.target.checked })}
            />
          </Form.Group>
        </div>
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityErpStatus">ERP Status:</Form.Label>
              <select class="form-select" aria-label="Default select example"
                id="OpportunityErpStatus"
                name="OpportunityErpStatus"
                value={formData.OpportunityErpStatus}
                onChange={handleInputChange}
              >
                <option selected>Select Status</option>
                <option value="NotReadyForSynchronization">Not Ready For Synchronization</option>
                <option value="ReadyForSynchronization">Ready For Synchronization</option>
              </select>
          </Form.Group>
        </div>
      </div>
    
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityErpSyncDateTime">ERP Sync Date & Time:</Form.Label>
            <Form.Control
              type="datetime-local"
              id="OpportunityErpSyncDateTime"
              name="OpportunityErpSyncDateTime"
              value={formData.OpportunityErpSyncDateTime}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityGmRevenue1">GM Revenue 1:</Form.Label>
            <Form.Control
              type="number"
              id="OpportunityGmRevenue1"
              name="OpportunityGmRevenue1"
              value={formData.OpportunityGmRevenue1}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>
      </div>
      */}
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityOrganisationId">Organisation ID:</Form.Label>
            <Form.Control
              type="number"
              id="OpportunityOrganisationId"
              name="OpportunityOrganisationId"
              value={formData.OpportunityOrganisationId}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>
        {/*}
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityPercent">Opportunity Percent:</Form.Label>
            <Form.Control
              type="number"
              id="OpportunityPercent"
              name="OpportunityPercent"
              value={formData.OpportunityPercent}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>
      </div>
      */}
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityPersonId">Person ID:</Form.Label>
            <Form.Control
              type="number"
              id="OpportunityPersonId"
              name="OpportunityPersonId"
              value={formData.OpportunityPersonId}
              onChange={handleInputChange}
            />
          </Form.Group>
        </div>
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityPersonId2">Second Person ID:</Form.Label>
            <Form.Control
              type="number"
              id="OpportunityPersonId2"
              name="OpportunityPersonId2"
              value={formData.OpportunityPersonId2}
              onChange={handleInputChange}
            />
          </Form.Group>
          </div>
      </div>
      {/*}
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityAddress">Address:</Form.Label>
            <Form.Control
              type="text"
              id="OpportunityAddress"
              name="OpportunityAddress"
              value={formData.OpportunityAddress}
              onChange={handleInputChange}
              placeholder="Opportunity Address"
            />
          </Form.Group>
        </div>
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityPostCode">Post Code:</Form.Label>
            <Form.Control
              type="text"
              id="OpportunityPostCode"
              name="OpportunityPostCode"
              value={formData.OpportunityPostCode}
              onChange={handleInputChange}
              placeholder="Post Code"
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>          
            <Form.Label htmlFor="OpportunityCity">City:</Form.Label>
            <Form.Control
              type="text"
              id="OpportunityCity"
              name="OpportunityCity"
              value={formData.OpportunityCity}
              onChange={handleInputChange}
              placeholder="City"
            />
          </Form.Group>
        </div>
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }} >  
            <Form.Label htmlFor="OpportunityState">State:</Form.Label>
            <Form.Control
              type="text" 
              id="OpportunityState"
              name="OpportunityState"
              value={formData.OpportunityState}
              onChange={handleInputChange}
              placeholder="State"
            />
          </Form.Group>
          </div>
      </div>
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}> 
            <Form.Label htmlFor="OpportunityCountryValue">Country Value:</Form.Label>
            <Form.Control
              type="text"
              id="OpportunityCountryValue"
              name="OpportunityCountryValue"
              value={formData.OpportunityCountryValue}
              onChange={handleInputChange}
              placeholder="Country Value"
            />
          </Form.Group>
        </div>
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityCountryName">Country Name:</Form.Label>
            <Form.Control
              type="text"
              id="OpportunityCountryName"
              name="OpportunityCountryName"
              value={formData.OpportunityCountry.Name}
              onChange={(e) => setFormData({ ...formData, OpportunityCountry: { ...formData.OpportunityCountry, Name: e.target.value } })}
              placeholder="Country Name"
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityCountryCodeISO">Country Code ISO:</Form.Label>
            <Form.Control
              type="text"
              id="OpportunityCountryCodeISO"
              name="OpportunityCountryCodeISO"
              value={formData.OpportunityCountry.CodeISO}
              onChange={(e) => setFormData({ ...formData, OpportunityCountry: { ...formData.OpportunityCountry, CodeISO: e.target.value } })}
              placeholder="Country Code ISO"
            />
          </Form.Group>
        </div>
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityProduct">Product:</Form.Label>
            <Form.Control
              type="text"
              id="OpportunityProduct"
              name="OpportunityProduct"
              value={formData.OpportunityProduct}
              onChange={handleInputChange}
              placeholder="Associated Product"
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityProductId">Product ID:</Form.Label>
            <Form.Control
              type="number"
              id="OpportunityProductId"
              name="OpportunityProductId"
              value={formData.OpportunityProductId}
              onChange={handleInputChange}
              placeholder="Product ID"
            />
          </Form.Group>
        </div>
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityQuotationLanguageId">Quotation Language ID:</Form.Label>
            <Form.Control
              type="number"
              id="OpportunityQuotationLanguageId"
              name="OpportunityQuotationLanguageId"
              value={formData.OpportunityQuotationLanguageId}
              onChange={handleInputChange}
              placeholder="Quotation Language ID"
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunityRevenue1">Revenue 1:</Form.Label>
            <Form.Control
              type="number"
              id="OpportunityRevenue1"
              name="OpportunityRevenue1"
              value={formData.OpportunityRevenue1}
              onChange={handleInputChange}
              placeholder="Revenue for Period 1"
            />
          </Form.Group>
        </div>
        */}
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunitySearch1">Search Keyword 1:</Form.Label>
            <Form.Control
              type="text"
              id="OpportunitySearch1"
              name="OpportunitySearch1"
              value={formData.OpportunitySearch1}
              onChange={handleInputChange}
              placeholder="Search Keyword 1"
            />
          </Form.Group>
        </div>
      </div>
      <div className="row">
        <div className="col-md">
          <Form.Group style={{ marginBottom: '10px' }}>
            <Form.Label htmlFor="OpportunitySearch2">Search Keyword 2:</Form.Label>
            <Form.Control
              type="text"
              id="OpportunitySearch2"
              name="OpportunitySearch2"
              value={formData.OpportunitySearch2}
              onChange={handleInputChange}
              placeholder="Search Keyword 2"
            />
          </Form.Group>
        </div>
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunitySpentTime">Spent Time:</Form.Label>
          <Form.Control
            type="text"
            id="OpportunitySpentTime"
            name="OpportunitySpentTime"
            value={formData.OpportunitySpentTime}
            onChange={handleInputChange}
            placeholder="HH:MM:SS"
          />
        </Form.Group>
      </div>
    </div>
    <div className="row">
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityUpdatedAt">Updated At:</Form.Label>
          <Form.Control
            type="datetime-local"
            id="OpportunityUpdatedAt"
            name="OpportunityUpdatedAt"
            value={formData.OpportunityUpdatedAt}
            onChange={handleInputChange}
          />
        </Form.Group>
      </div>
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityUpdatedBy">Updated By:</Form.Label>
          <Form.Control
            type="text"
            id="OpportunityUpdatedBy"
            name="OpportunityUpdatedBy"
            value={formData.OpportunityUpdatedBy}
            onChange={handleInputChange}
            placeholder="Updater's Identifier"
          />
        </Form.Group>
      </div>
    </div>
    {/*}
    <div className="row">
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityUserGroupId">User Group ID:</Form.Label>
          <Form.Control
            type="number"
            id="OpportunityUserGroupId"
            name="OpportunityUserGroupId"
            value={formData.OpportunityUserGroupId}
            onChange={handleInputChange}
            placeholder="User Group ID"
          />
        </Form.Group>
      </div>
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityWinPercent">Win Percent:</Form.Label>
          <Form.Control
            type="number"
            id="OpportunityWinPercent"
            name="OpportunityWinPercent"
            value={formData.OpportunityWinPercent}
            onChange={handleInputChange}
            placeholder="Winning Percentage"
          />
        </Form.Group>
      </div>
    </div>
    <div className="row">
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityWinPercent2">Secondary Win Percent:</Form.Label>
          <Form.Control
            type="number"
            id="OpportunityWinPercent2"
            name="OpportunityWinPercent2"
            value={formData.OpportunityWinPercent2}
            onChange={handleInputChange}
            placeholder="Secondary Winning Percentage"
          />
        </Form.Group>
      </div>
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityWinYesNo">Win Yes/No:</Form.Label>
          <select class="form-select" aria-label="Default select example"
              id="OpportunityWinYesNo"
              name="OpportunityWinYesNo"
              value={formData.OpportunityWinYesNo}
              onChange={handleInputChange}
            >
            <option value="">Select</option>
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </select>
        </Form.Group>
      </div>
    </div>
    <div className="row">
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityMemo">Memo:</Form.Label>
          <Form.Control
            as="textarea" rows={3}
            id="OpportunityMemo"
            name="OpportunityMemo"
            value={formData.OpportunityMemo}
            onChange={handleInputChange}
            placeholder="Additional notes or memo"
          />
        </Form.Group>
        
      </div>
      */}
      <div className="col-md">
        <div>
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityCustom1">Custom Field 1:</Form.Label>
          <Form.Control
            type={formData.OpportunityCustom1 ? 'date' : 'text'} // Assuming it could be a date or text based on your setup
            id="OpportunityCustom1"
            name="OpportunityCustom1"
            value={formData.OpportunityCustom1}
            onChange={handleInputChange}
            placeholder="Custom Field 1 Value or Date"
          />
        </Form.Group>
      </div>
    </div>
    <div className="row">
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityCustom2">Custom Field 2:</Form.Label>
          <Form.Control
            type="date" // Assuming it's a date based on your setup
            id="OpportunityCustom2"
            name="OpportunityCustom2"
            value={formData.OpportunityCustom2}
            onChange={handleInputChange}
          />
        </Form.Group>
      </div>
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityCustom3">Custom Field 3:</Form.Label>
          <Form.Control
            type="text"
            id="OpportunityCustom3"
            name="OpportunityCustom3"
            value={formData.OpportunityCustom3}
            onChange={handleInputChange}
            placeholder="Custom Field 3 Value"
          />
        </Form.Group>
        </div>
    </div>
    <div className="row">
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityCustom4">Custom Field 4 (Documentation):</Form.Label>
          <Form.Control
            type="text"
            id="OpportunityCustom4"
            name="OpportunityCustom4"
            value={formData.OpportunityCustom4}
            onChange={handleInputChange}
            placeholder="SAP Documentation etc."
          />
        </Form.Group>
      </div>
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityCustom6">Custom Field 6:</Form.Label>
          <Form.Control
            type="text"
            id="OpportunityCustom6"
            name="OpportunityCustom6"
            value={formData.OpportunityCustom6}
            onChange={handleInputChange}
            placeholder="Custom Field 6 Value"
        />
        </Form.Group>
      </div>
    </div>
    <div className="row">
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityCustom7">Custom Field 7 (Customer Development):</Form.Label>
          <Form.Control
            type="text"
            id="OpportunityCustom7"
            name="OpportunityCustom7"
            value={formData.OpportunityCustom7}
            onChange={handleInputChange}
            placeholder="Details about customer development"
        />
        </Form.Group>
      </div>
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityCustom8">Custom Field 8 (Hardware Details):</Form.Label>
          <Form.Control
            type="text"
            id="OpportunityCustom8"
            name="OpportunityCustom8"
            value={formData.OpportunityCustom8}
            onChange={handleInputChange}
            placeholder="e.g., NXP iMX7, iMX6"
        />
        </Form.Group>
      </div>
    </div>
    <div className="row">
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityLevel">Opportunity Level:</Form.Label>
          <Form.Control
            type="number"
            id="OpportunityLevel"
            name="OpportunityLevel"
            value={formData.OpportunityLevel}
            onChange={handleInputChange}
            placeholder="Opportunity Level"
        />
        </Form.Group>
      </div>
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityPipelineType">Pipeline Type:</Form.Label>
          <Form.Control
            type="number"
            id="OpportunityPipelineType"
            name="OpportunityPipelineType"
            value={formData.OpportunityPipelineType}
            onChange={handleInputChange}
            placeholder="Pipeline Type"
        />
        </Form.Group>
      </div>
    </div>
    <div className="row">
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityLevelText">Level Text:</Form.Label>
          <Form.Control
            type="text"
            id="OpportunityLevelText"
            name="OpportunityLevelText"
            value={formData.OpportunityLevelText}
            onChange={handleInputChange}
            placeholder="[1] Prospekt/Förfrågan"
        />
        </Form.Group>
      </div>
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityLostDate">Lost Date:</Form.Label>
          <Form.Control
            type="datetime-local"
            id="OpportunityLostDate"
            name="OpportunityLostDate"
            value={formData.OpportunityLostDate}
            onChange={handleInputChange}
        />
        </Form.Group>
      </div>
    </div>
    <div className="row">
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityNextFollowUp">Next Follow Up:</Form.Label>
          <Form.Control
            type="datetime-local"
            id="OpportunityNextFollowUp"
            name="OpportunityNextFollowUp"
            value={formData.OpportunityNextFollowUp}
            onChange={handleInputChange}
          />
        </Form.Group>
      </div>
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityNumber">Opportunity Number:</Form.Label>
          <Form.Control
            type="text"
            id="OpportunityNumber"
            name="OpportunityNumber"
            value={formData.OpportunityNumber}
            onChange={handleInputChange}
            placeholder="Opportunity Number"
          />
        </Form.Group>
      </div>
    </div>
    <div className="row">
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityOrderDate">Order Date:</Form.Label>
          <Form.Control
            type="datetime-local"
            id="OpportunityOrderDate"
            name="OpportunityOrderDate"
            value={formData.OpportunityOrderDate}
            onChange={handleInputChange}
          />
        </Form.Group>
      </div>
      <div className="col-md">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityOrganisationId">Organisation ID:</Form.Label>
          <Form.Control
            type="number"
            id="OpportunityOrganisationId"
            name="OpportunityOrganisationId"
            value={formData.OpportunityOrganisationId}
            onChange={handleInputChange}
            placeholder="Organisation ID"
          />
        </Form.Group>
      </div>
    </div>
    {/*}
      <div className="row">
        <Form.Group style={{ marginBottom: '10px' }}>
          <Form.Label htmlFor="OpportunityAssignedTo">Assigned To:</Form.Label>
          <Form.Control
            type="number"
            id="OpportunityAssignedTo"
            name="OpportunityAssignedTo"
            value={formData.OpportunityAssignedTo}
            onChange={handleInputChange}
          />
        </Form.Group>
      </div>
*/}
  {/* Add more form fields as needed */}

              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '35px' }}>
                <Button variant="contained" color="primary" onClick={handleCancel} style={{  border: '1px solid' , borderRadius: '6px', marginRight: '30px' }}>
                  Avbryt
                </Button>
                <Button variant="contained" color="primary" type="submit" style={{ border: '1px solid' , borderRadius: '6px' }}>
                  Skapa
                </Button>
              </div>
            </Form>
          </Card.Body>
        </Paper>
      </div>
    </div>
    );
  };
export default OpportunityForm;
