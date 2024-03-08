import React, { useState } from 'react';
import axios from 'axios';

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
      // Handle the response, e.g., setting a success message or clearing the form
    } catch (error) {
      console.error('Error creating opportunity:', error.response);
      // Handle the error, e.g., setting an error message
    }
  };

  // The return statement with form inputs remains the same, adjust type="text" to type="number" where applicable
  // For date inputs, use type="datetime-local" and handleDateChange for onChange
  // For checkboxes, use checked attribute and handleInputChange for onChange

  return (
    <form onSubmit={handleSubmit}>
  <div>
    <label htmlFor="OpportunityAssignedTo">Assigned To:</label>
    <input
      type="number"
      id="OpportunityAssignedTo"
      name="OpportunityAssignedTo"
      value={formData.OpportunityAssignedTo}
      onChange={handleInputChange}
    />
  </div>

  <div>
    <label htmlFor="OpportunityAssignedTo2">Assigned To 2:</label>
    <input
      type="number"
      id="OpportunityAssignedTo2"
      name="OpportunityAssignedTo2"
      value={formData.OpportunityAssignedTo2}
      onChange={handleInputChange}
    />
  </div>

  <div>
    <label htmlFor="OpportunityComment">Comment:</label>
    <input
      type="text"
      id="OpportunityComment"
      name="OpportunityComment"
      value={formData.OpportunityComment}
      onChange={handleInputChange}
    />
  </div>

  <div>
    <label htmlFor="OpportunityCreatedAt">Created At:</label>
    <input
      type="datetime-local"
      id="OpportunityCreatedAt"
      name="OpportunityCreatedAt"
      value={formData.OpportunityCreatedAt}
      onChange={handleInputChange}
    />
  </div>
  
{/* OpportunityCreatedBy */}
<div>
  <label htmlFor="OpportunityCreatedBy">Created By:</label>
  <input
    type="text"
    id="OpportunityCreatedBy"
    name="OpportunityCreatedBy"
    value={formData.OpportunityCreatedBy}
    onChange={handleInputChange}
  />
</div>

{/* OpportunityCurrencyName */}
<div>
  <label htmlFor="OpportunityCurrencyName">Currency Name:</label>
  <input
    type="text"
    id="OpportunityCurrencyName"
    name="OpportunityCurrencyName"
    value={formData.OpportunityCurrencyName}
    onChange={handleInputChange}
  />
</div>

{/* OpportunityCurrencySymbol */}
<div>
  <label htmlFor="OpportunityCurrencySymbol">Currency Symbol:</label>
  <input
    type="text"
    id="OpportunityCurrencySymbol"
    name="OpportunityCurrencySymbol"
    value={formData.OpportunityCurrencySymbol}
    onChange={handleInputChange}
  />
</div>

{/* OpportunityDescription */}
<div>
  <label htmlFor="OpportunityDescription">Description:</label>
  <textarea
    id="OpportunityDescription"
    name="OpportunityDescription"
    value={formData.OpportunityDescription}
    onChange={handleInputChange}
  />
</div>

{/* OpportunityDiscount */}
<div>
  <label htmlFor="OpportunityDiscount">Discount:</label>
  <input
    type="number"
    id="OpportunityDiscount"
    name="OpportunityDiscount"
    value={formData.OpportunityDiscount}
    onChange={handleInputChange}
  />
</div>

{/* OpportunityErpId */}
<div>
  <label htmlFor="OpportunityErpId">ERP ID:</label>
  <input
    type="text"
    id="OpportunityErpId"
    name="OpportunityErpId"
    value={formData.OpportunityErpId}
    onChange={handleInputChange}
  />
</div>

<div>
  <label htmlFor="OpportunityErpReadOnly">ERP Read Only:</label>
  <input
    type="checkbox"
    id="OpportunityErpReadOnly"
    name="OpportunityErpReadOnly"
    checked={formData.OpportunityErpReadOnly}
    onChange={(e) => setFormData({ ...formData, OpportunityErpReadOnly: e.target.checked })}
  />
</div>

{/* OpportunityErpStatus */}
<div>
  <label htmlFor="OpportunityErpStatus">ERP Status:</label>
  <select
    id="OpportunityErpStatus"
    name="OpportunityErpStatus"
    value={formData.OpportunityErpStatus}
    onChange={handleInputChange}
  >
    <option value="">Select Status</option>
    <option value="NotReadyForSynchronization">Not Ready For Synchronization</option>
    <option value="ReadyForSynchronization">Ready For Synchronization</option>
    {/* Add other status options as needed */}
  </select>
</div>

{/* OpportunityErpSyncDateTime */}
<div>
  <label htmlFor="OpportunityErpSyncDateTime">ERP Sync Date & Time:</label>
  <input
    type="datetime-local"
    id="OpportunityErpSyncDateTime"
    name="OpportunityErpSyncDateTime"
    value={formData.OpportunityErpSyncDateTime}
    onChange={handleInputChange}
  />
</div>

{/* OpportunityGmRevenue1 */}
<div>
  <label htmlFor="OpportunityGmRevenue1">GM Revenue 1:</label>
  <input
    type="number"
    id="OpportunityGmRevenue1"
    name="OpportunityGmRevenue1"
    value={formData.OpportunityGmRevenue1}
    onChange={handleInputChange}
  />
</div>

{/* OpportunityOrganisationId */}
<div>
  <label htmlFor="OpportunityOrganisationId">Organisation ID:</label>
  <input
    type="number"
    id="OpportunityOrganisationId"
    name="OpportunityOrganisationId"
    value={formData.OpportunityOrganisationId}
    onChange={handleInputChange}
  />
</div>

{/* OpportunityPercent */}
<div>
  <label htmlFor="OpportunityPercent">Opportunity Percent:</label>
  <input
    type="number"
    id="OpportunityPercent"
    name="OpportunityPercent"
    value={formData.OpportunityPercent}
    onChange={handleInputChange}
  />
</div>

{/* OpportunityPersonId */}
<div>
  <label htmlFor="OpportunityPersonId">Person ID:</label>
  <input
    type="number"
    id="OpportunityPersonId"
    name="OpportunityPersonId"
    value={formData.OpportunityPersonId}
    onChange={handleInputChange}
  />
</div>

{/* OpportunityPersonId2 */}
<div>
  <label htmlFor="OpportunityPersonId2">Second Person ID:</label>
  <input
    type="number"
    id="OpportunityPersonId2"
    name="OpportunityPersonId2"
    value={formData.OpportunityPersonId2}
    onChange={handleInputChange}
  />
</div>
<div>
  <label htmlFor="OpportunityAddress">Address:</label>
  <input
    type="text"
    id="OpportunityAddress"
    name="OpportunityAddress"
    value={formData.OpportunityAddress}
    onChange={handleInputChange}
    placeholder="Opportunity Address"
  />
</div>

{/* OpportunityPostCode */}
<div>
  <label htmlFor="OpportunityPostCode">Post Code:</label>
  <input
    type="text"
    id="OpportunityPostCode"
    name="OpportunityPostCode"
    value={formData.OpportunityPostCode}
    onChange={handleInputChange}
    placeholder="Post Code"
  />
</div>

{/* OpportunityCity */}
<div>
  <label htmlFor="OpportunityCity">City:</label>
  <input
    type="text"
    id="OpportunityCity"
    name="OpportunityCity"
    value={formData.OpportunityCity}
    onChange={handleInputChange}
    placeholder="City"
  />
</div>

{/* OpportunityState */}
<div>
  <label htmlFor="OpportunityState">State:</label>
  <input
    type="text"
    id="OpportunityState"
    name="OpportunityState"
    value={formData.OpportunityState}
    onChange={handleInputChange}
    placeholder="State"
  />
</div>

{/* OpportunityCountryValue */}
<div>
  <label htmlFor="OpportunityCountryValue">Country Value:</label>
  <input
    type="text"
    id="OpportunityCountryValue"
    name="OpportunityCountryValue"
    value={formData.OpportunityCountryValue}
    onChange={handleInputChange}
    placeholder="Country Value"
  />
</div>

{/* OpportunityCountry */}
<div>
  <label htmlFor="OpportunityCountryName">Country Name:</label>
  <input
    type="text"
    id="OpportunityCountryName"
    name="OpportunityCountryName"
    value={formData.OpportunityCountry.Name}
    onChange={(e) => setFormData({ ...formData, OpportunityCountry: { ...formData.OpportunityCountry, Name: e.target.value } })}
    placeholder="Country Name"
  />
  <label htmlFor="OpportunityCountryCodeISO">Country Code ISO:</label>
  <input
    type="text"
    id="OpportunityCountryCodeISO"
    name="OpportunityCountryCodeISO"
    value={formData.OpportunityCountry.CodeISO}
    onChange={(e) => setFormData({ ...formData, OpportunityCountry: { ...formData.OpportunityCountry, CodeISO: e.target.value } })}
    placeholder="Country Code ISO"
  />
  {/* Note: CodeUN is set to null as per requirement, and does not require an input field */}
</div>

{/* OpportunityProduct */}
<div>
  <label htmlFor="OpportunityProduct">Product:</label>
  <input
    type="text"
    id="OpportunityProduct"
    name="OpportunityProduct"
    value={formData.OpportunityProduct}
    onChange={handleInputChange}
    placeholder="Associated Product"
  />
</div>

{/* OpportunityProductId */}
<div>
  <label htmlFor="OpportunityProductId">Product ID:</label>
  <input
    type="number"
    id="OpportunityProductId"
    name="OpportunityProductId"
    value={formData.OpportunityProductId}
    onChange={handleInputChange}
    placeholder="Product ID"
  />
</div>

{/* OpportunityQuotationLanguageId */}
<div>
  <label htmlFor="OpportunityQuotationLanguageId">Quotation Language ID:</label>
  <input
    type="number"
    id="OpportunityQuotationLanguageId"
    name="OpportunityQuotationLanguageId"
    value={formData.OpportunityQuotationLanguageId}
    onChange={handleInputChange}
    placeholder="Quotation Language ID"
  />
</div>

{/* OpportunityRevenue1 */}
<div>
  <label htmlFor="OpportunityRevenue1">Revenue 1:</label>
  <input
    type="number"
    id="OpportunityRevenue1"
    name="OpportunityRevenue1"
    value={formData.OpportunityRevenue1}
    onChange={handleInputChange}
    placeholder="Revenue for Period 1"
  />
</div>
<div>
  <label htmlFor="OpportunitySearch1">Search Keyword 1:</label>
  <input
    type="text"
    id="OpportunitySearch1"
    name="OpportunitySearch1"
    value={formData.OpportunitySearch1}
    onChange={handleInputChange}
    placeholder="Search Keyword 1"
  />
</div>

{/* OpportunitySearch2 */}
<div>
  <label htmlFor="OpportunitySearch2">Search Keyword 2:</label>
  <input
    type="text"
    id="OpportunitySearch2"
    name="OpportunitySearch2"
    value={formData.OpportunitySearch2}
    onChange={handleInputChange}
    placeholder="Search Keyword 2"
  />
</div>

{/* OpportunitySpentTime */}
<div>
  <label htmlFor="OpportunitySpentTime">Spent Time:</label>
  <input
    type="text"
    id="OpportunitySpentTime"
    name="OpportunitySpentTime"
    value={formData.OpportunitySpentTime}
    onChange={handleInputChange}
    placeholder="HH:MM:SS"
  />
</div>

{/* OpportunityUpdatedAt */}
<div>
  <label htmlFor="OpportunityUpdatedAt">Updated At:</label>
  <input
    type="datetime-local"
    id="OpportunityUpdatedAt"
    name="OpportunityUpdatedAt"
    value={formData.OpportunityUpdatedAt}
    onChange={handleInputChange}
  />
</div>

{/* OpportunityUpdatedBy */}
<div>
  <label htmlFor="OpportunityUpdatedBy">Updated By:</label>
  <input
    type="text"
    id="OpportunityUpdatedBy"
    name="OpportunityUpdatedBy"
    value={formData.OpportunityUpdatedBy}
    onChange={handleInputChange}
    placeholder="Updater's Identifier"
  />
</div>

{/* OpportunityUserGroupId */}
<div>
  <label htmlFor="OpportunityUserGroupId">User Group ID:</label>
  <input
    type="number"
    id="OpportunityUserGroupId"
    name="OpportunityUserGroupId"
    value={formData.OpportunityUserGroupId}
    onChange={handleInputChange}
    placeholder="User Group ID"
  />
</div>

{/* OpportunityWinPercent */}
<div>
  <label htmlFor="OpportunityWinPercent">Win Percent:</label>
  <input
    type="number"
    id="OpportunityWinPercent"
    name="OpportunityWinPercent"
    value={formData.OpportunityWinPercent}
    onChange={handleInputChange}
    placeholder="Winning Percentage"
  />
</div>

{/* OpportunityWinPercent2 */}
<div>
  <label htmlFor="OpportunityWinPercent2">Secondary Win Percent:</label>
  <input
    type="number"
    id="OpportunityWinPercent2"
    name="OpportunityWinPercent2"
    value={formData.OpportunityWinPercent2}
    onChange={handleInputChange}
    placeholder="Secondary Winning Percentage"
  />
</div>

{/* OpportunityWinYesNo */}
<div>
  <label htmlFor="OpportunityWinYesNo">Win Yes/No:</label>
  <select
    id="OpportunityWinYesNo"
    name="OpportunityWinYesNo"
    value={formData.OpportunityWinYesNo}
    onChange={handleInputChange}
  >
    <option value="">Select</option>
    <option value={true}>Yes</option>
    <option value={false}>No</option>
  </select>
</div>

{/* OpportunityMemo */}
<div>
  <label htmlFor="OpportunityMemo">Memo:</label>
  <textarea
    id="OpportunityMemo"
    name="OpportunityMemo"
    value={formData.OpportunityMemo}
    onChange={handleInputChange}
    placeholder="Additional notes or memo"
  />
</div>

{/* Custom Fields */}
<div>
  <label htmlFor="OpportunityCustom1">Custom Field 1:</label>
  <input
    type={formData.OpportunityCustom1 ? 'date' : 'text'} // Assuming it could be a date or text based on your setup
    id="OpportunityCustom1"
    name="OpportunityCustom1"
    value={formData.OpportunityCustom1}
    onChange={handleInputChange}
    placeholder="Custom Field 1 Value or Date"
  />
</div>
<div>
  <label htmlFor="OpportunityCustom2">Custom Field 2:</label>
  <input
    type="date" // Assuming it's a date based on your setup
    id="OpportunityCustom2"
    name="OpportunityCustom2"
    value={formData.OpportunityCustom2}
    onChange={handleInputChange}
  />
</div>

{/* OpportunityCustom3 */}
<div>
  <label htmlFor="OpportunityCustom3">Custom Field 3:</label>
  <input
    type="text"
    id="OpportunityCustom3"
    name="OpportunityCustom3"
    value={formData.OpportunityCustom3}
    onChange={handleInputChange}
    placeholder="Custom Field 3 Value"
  />
</div>

{/* OpportunityCustom4 */}
<div>
  <label htmlFor="OpportunityCustom4">Custom Field 4 (Documentation):</label>
  <input
    type="text"
    id="OpportunityCustom4"
    name="OpportunityCustom4"
    value={formData.OpportunityCustom4}
    onChange={handleInputChange}
    placeholder="SAP Documentation etc."
  />
</div>

{/* OpportunityCustom6 */}
<div>
  <label htmlFor="OpportunityCustom6">Custom Field 6:</label>
  <input
    type="text"
    id="OpportunityCustom6"
    name="OpportunityCustom6"
    value={formData.OpportunityCustom6}
    onChange={handleInputChange}
    placeholder="Custom Field 6 Value"
  />
</div>

{/* OpportunityCustom7 */}
<div>
  <label htmlFor="OpportunityCustom7">Custom Field 7 (Customer Development):</label>
  <input
    type="text"
    id="OpportunityCustom7"
    name="OpportunityCustom7"
    value={formData.OpportunityCustom7}
    onChange={handleInputChange}
    placeholder="Details about customer development"
  />
</div>

{/* OpportunityCustom8 */}
<div>
  <label htmlFor="OpportunityCustom8">Custom Field 8 (Hardware Details):</label>
  <input
    type="text"
    id="OpportunityCustom8"
    name="OpportunityCustom8"
    value={formData.OpportunityCustom8}
    onChange={handleInputChange}
    placeholder="e.g., NXP iMX7, iMX6"
  />
</div>
<div>
  <label htmlFor="OpportunityLevel">Opportunity Level:</label>
  <input
    type="number"
    id="OpportunityLevel"
    name="OpportunityLevel"
    value={formData.OpportunityLevel}
    onChange={handleInputChange}
    placeholder="Opportunity Level"
  />
</div>

{/* OpportunityPipelineType */}
<div>
  <label htmlFor="OpportunityPipelineType">Pipeline Type:</label>
  <input
    type="number"
    id="OpportunityPipelineType"
    name="OpportunityPipelineType"
    value={formData.OpportunityPipelineType}
    onChange={handleInputChange}
    placeholder="Pipeline Type"
  />
</div>

{/* OpportunityLevelText */}
<div>
  <label htmlFor="OpportunityLevelText">Level Text:</label>
  <input
    type="text"
    id="OpportunityLevelText"
    name="OpportunityLevelText"
    value={formData.OpportunityLevelText}
    onChange={handleInputChange}
    placeholder="[1] Prospekt/Förfrågan"
  />
</div>

{/* OpportunityLostDate */}
<div>
  <label htmlFor="OpportunityLostDate">Lost Date:</label>
  <input
    type="datetime-local"
    id="OpportunityLostDate"
    name="OpportunityLostDate"
    value={formData.OpportunityLostDate}
    onChange={handleInputChange}
  />
</div>

{/* OpportunityNextFollowUp */}
<div>
  <label htmlFor="OpportunityNextFollowUp">Next Follow Up:</label>
  <input
    type="datetime-local"
    id="OpportunityNextFollowUp"
    name="OpportunityNextFollowUp"
    value={formData.OpportunityNextFollowUp}
    onChange={handleInputChange}
  />
</div>

{/* OpportunityNumber */}
<div>
  <label htmlFor="OpportunityNumber">Opportunity Number:</label>
  <input
    type="text"
    id="OpportunityNumber"
    name="OpportunityNumber"
    value={formData.OpportunityNumber}
    onChange={handleInputChange}
    placeholder="Opportunity Number"
  />
</div>

{/* OpportunityOrderDate */}
<div>
  <label htmlFor="OpportunityOrderDate">Order Date:</label>
  <input
    type="datetime-local"
    id="OpportunityOrderDate"
    name="OpportunityOrderDate"
    value={formData.OpportunityOrderDate}
    onChange={handleInputChange}
  />
</div>

{/* OpportunityOrganisationId */}
<div>
  <label htmlFor="OpportunityOrganisationId">Organisation ID:</label>
  <input
    type="number"
    id="OpportunityOrganisationId"
    name="OpportunityOrganisationId"
    value={formData.OpportunityOrganisationId}
    onChange={handleInputChange}
    placeholder="Organisation ID"
  />
</div>
<div>
        <label htmlFor="OpportunityAssignedTo">Assigned To:</label>
        <input
          type="number"
          id="OpportunityAssignedTo"
          name="OpportunityAssignedTo"
          value={formData.OpportunityAssignedTo}
          onChange={handleInputChange}
        />
      </div>

  {/* Add more form fields as needed */}

  <button type="submit">Create Opportunity</button>
</form>
  );
};

export default OpportunityForm;
