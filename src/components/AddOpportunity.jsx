import React, { useState } from 'react';
import axios from 'axios';

const AddOpportunity = () => {
  const initialOpportunityState = {
    OpportunityAssignedTo: 0,
    OpportunityAssignedTo2: 0,
    OpportunityComment: '',
    OpportunityCreatedAt: '2024-02-26T14:09:34.315Z',
    OpportunityCreatedBy: 'string',
    OpportunityCurrencyName: 'string',
    OpportunityCurrencySymbol: 'string',
    OpportunityDescription: 'string',
    OpportunityDiscount: 0,
    OpportunityErpId: 'string',
    OpportunityErpReadOnly: 'string',
    OpportunityErpStatus: 'NotReadyForSynchronization',
    OpportunityErpSyncDateTime: '2024-02-26T14:09:34.316Z',
    OpportunityGmRevenue1: 0,
    OpportunityGmRevenue2: 0,
    OpportunityGmRevenue3: 0,
    OpportunityGmRevenue4: 0,
    OpportunityGmRevenue5: 0,
    OpportunityGmRevenue6: 0,
    OpportunityGmRevenue7: 0,
    OpportunityGmRevenue8: 0,
    OpportunityGmRevenue9: 0,
    OpportunityGmRevenue10: 0,
    OpportunityGmRevenue11: 0,
    OpportunityGmRevenue12: 0,
    OpportunityHistory: 'string',
    OpportunityId: 0,
    OpportunityLevel: 0,
    OpportunityPipelineType: 0,
    OpportunityLevelText: 'string',
    OpportunityLost1: 'string',
    OpportunityLost2: 'string',
    OpportunityLost3: 'string',
    OpportunityLostDate: '2024-02-26T14:09:34.316Z',
    OpportunityNextFollowUp: '2024-02-26T14:09:34.316Z',
    OpportunityNote: 'string',
    OpportunityNumber: 'string',
    OpportunityOrderDate: '2024-02-26T14:09:34.316Z',
    OpportunityOrderGmValue: 0,
    OpportunityOrderValue: 0,
    OpportunityOrganisationId: 0,
    OpportunityPercent: 0,
    OpportunityPersonId: 0,
    OpportunityPersonId2: 0,
    OpportunityAddress: 'string',
    OpportunityPostCode: 'string',
    OpportunityCity: 'string',
    OpportunityState: 'string',
    OpportunityCountryValue: 'string',
    OpportunityCountry: {
      Name: 'string',
      CodeISO: 'string',
      CodeUN: 'string',
    },
    OpportunityGps: 'string',
    OpportunityProduct: 'string',
    OpportunityProductId: 0,
    OpportunityQuotationLanguageId: 0,
    OpportunityRevenue1: 0,
    OpportunityRevenue2: 0,
    OpportunityRevenue3: 0,
    OpportunityRevenue4: 0,
    OpportunityRevenue5: 0,
    OpportunityRevenue6: 0,
    OpportunityRevenue7: 0,
    OpportunityRevenue8: 0,
    OpportunityRevenue9: 0,
    OpportunityRevenue10: 0,
    OpportunityRevenue11: 0,
    OpportunityRevenue12: 0,
    OpportunitySearch1: 'string',
    OpportunitySearch2: 'string',
    OpportunitySpentTime: 'string',
    OpportunityUpdatedAt: '2024-02-26T14:09:34.316Z',
    OpportunityUpdatedBy: 'string',
    OpportunityUserGroupId: 0,
    OpportunityWinPercent: 0,
    OpportunityWinPercent2: 0,
    OpportunityWinYesNo: true,
    OpportunitySecurityInfo: {
      CanRead: true,
      CanEdit: true,
    },
    OpportunityPlus1: 'string',
    OpportunityPlus2: 'string',
    OpportunityPlus3: 'string',
    OpportunityPlus4: 'string',
    OpportunityPlus5: 'string',
    OpportunityPlus6: 'string',
    OpportunityPlus7: 'string',
    OpportunityPlus8: 'string',
    OpportunityPlus9: 'string',
    OpportunityPlus10: 'string',
    OpportunityPlus11: 'string',
    OpportunityPlus12: 'string',
    OpportunityPlus13: 'string',
    OpportunityPlus14: 'string',
    OpportunityPlus15: 'string',
    OpportunityPlus16: 'string',
    OpportunityPlus17: 'string',
    OpportunityPlus18: 'string',
    OpportunityPlus19: 'string',
    OpportunityPlus20: 'string',
    OpportunityCustom1: 'string',
    OpportunityCustom2: 'string',
    OpportunityCustom3: 'string',
    OpportunityCustom4: 'string',
    OpportunityCustom5: 'string',
    OpportunityCustom6: 'string',
    OpportunityCustom7: 'string',
    OpportunityCustom8: 'string',
    OpportunityCustom9: 'string',
    OpportunityCustom10: 'string',
  };

  const [opportunityData, setOpportunityData] = useState(initialOpportunityState);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setOpportunityData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);

    try {
      const token = localStorage.getItem('token');
      await axios.post('https://api.webcrm.com/Opportunities', opportunityData, {
        headers: { 'Authorization': `Bearer ${token}` },
      });

      // Handle success (e.g., clearing the form, showing a success message)
      setOpportunityData(initialOpportunityState);
    } catch (err) {
      setError('Failed to add opportunity. Please try again.');
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Opportunity Description:
        <input
          type="text"
          name="OpportunityDescription"
          value={opportunityData.OpportunityDescription}
          onChange={handleChange}
        />
      </label>
  
      <label>
        Opportunity Assigned To:
        <input
          type="number"
          name="OpportunityAssignedTo"
          value={opportunityData.OpportunityAssignedTo}
          onChange={handleChange}
        />
      </label>
  
      <label>
        Opportunity Assigned To 2:
        <input
          type="number"
          name="OpportunityAssignedTo2"
          value={opportunityData.OpportunityAssignedTo2}
          onChange={handleChange}
        />
      </label>
  
      <label>
        Opportunity Comment:
        <input
          type="text"
          name="OpportunityComment"
          value={opportunityData.OpportunityComment}
          onChange={handleChange}
        />
      </label>
  
      <label>
        Opportunity Created At:
        <input
          type="datetime-local"
          name="OpportunityCreatedAt"
          value={opportunityData.OpportunityCreatedAt}
          onChange={handleChange}
        />
      </label>

      <label>
  Opportunity Created By:
  <input
    type="text"
    name="OpportunityCreatedBy"
    value={opportunityData.OpportunityCreatedBy}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Currency Name:
  <input
    type="text"
    name="OpportunityCurrencyName"
    value={opportunityData.OpportunityCurrencyName}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Currency Symbol:
  <input
    type="text"
    name="OpportunityCurrencySymbol"
    value={opportunityData.OpportunityCurrencySymbol}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Discount:
  <input
    type="number"
    name="OpportunityDiscount"
    value={opportunityData.OpportunityDiscount}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity ERP ID:
  <input
    type="text"
    name="OpportunityErpId"
    value={opportunityData.OpportunityErpId}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity ERP Read Only:
  <input
    type="text"
    name="OpportunityErpReadOnly"
    value={opportunityData.OpportunityErpReadOnly}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity ERP Status:
  <input
    type="text"
    name="OpportunityErpStatus"
    value={opportunityData.OpportunityErpStatus}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity ERP Sync Date Time:
  <input
    type="datetime-local"
    name="OpportunityErpSyncDateTime"
    value={opportunityData.OpportunityErpSyncDateTime}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity GM Revenue 1:
  <input
    type="number"
    name="OpportunityGmRevenue1"
    value={opportunityData.OpportunityGmRevenue1}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity GM Revenue 3:
  <input
    type="number"
    name="OpportunityGmRevenue3"
    value={opportunityData.OpportunityGmRevenue3}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity GM Revenue 4:
  <input
    type="number"
    name="OpportunityGmRevenue4"
    value={opportunityData.OpportunityGmRevenue4}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity GM Revenue 5:
  <input
    type="number"
    name="OpportunityGmRevenue5"
    value={opportunityData.OpportunityGmRevenue5}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity GM Revenue 6:
  <input
    type="number"
    name="OpportunityGmRevenue6"
    value={opportunityData.OpportunityGmRevenue6}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity GM Revenue 7:
  <input
    type="number"
    name="OpportunityGmRevenue7"
    value={opportunityData.OpportunityGmRevenue7}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity GM Revenue 8:
  <input
    type="number"
    name="OpportunityGmRevenue8"
    value={opportunityData.OpportunityGmRevenue8}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity GM Revenue 9:
  <input
    type="number"
    name="OpportunityGmRevenue9"
    value={opportunityData.OpportunityGmRevenue9}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity GM Revenue 10:
  <input
    type="number"
    name="OpportunityGmRevenue10"
    value={opportunityData.OpportunityGmRevenue10}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity GM Revenue 11:
  <input
    type="number"
    name="OpportunityGmRevenue11"
    value={opportunityData.OpportunityGmRevenue11}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity GM Revenue 12:
  <input
    type="number"
    name="OpportunityGmRevenue12"
    value={opportunityData.OpportunityGmRevenue12}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity History:
  <input
    type="text"
    name="OpportunityHistory"
    value={opportunityData.OpportunityHistory}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity ID:
  <input
    type="number"
    name="OpportunityId"
    value={opportunityData.OpportunityId}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Level:
  <input
    type="number"
    name="OpportunityLevel"
    value={opportunityData.OpportunityLevel}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Pipeline Type:
  <input
    type="number"
    name="OpportunityPipelineType"
    value={opportunityData.OpportunityPipelineType}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Level Text:
  <input
    type="text"
    name="OpportunityLevelText"
    value={opportunityData.OpportunityLevelText}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Lost 1:
  <input
    type="text"
    name="OpportunityLost1"
    value={opportunityData.OpportunityLost1}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Lost 2:
  <input
    type="text"
    name="OpportunityLost2"
    value={opportunityData.OpportunityLost2}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Lost 3:
  <input
    type="text"
    name="OpportunityLost3"
    value={opportunityData.OpportunityLost3}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Lost Date:
  <input
    type="datetime-local"
    name="OpportunityLostDate"
    value={opportunityData.OpportunityLostDate}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Next Follow-Up:
  <input
    type="datetime-local"
    name="OpportunityNextFollowUp"
    value={opportunityData.OpportunityNextFollowUp}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Note:
  <input
    type="text"
    name="OpportunityNote"
    value={opportunityData.OpportunityNote}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Number:
  <input
    type="text"
    name="OpportunityNumber"
    value={opportunityData.OpportunityNumber}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Order Date:
  <input
    type="datetime-local"
    name="OpportunityOrderDate"
    value={opportunityData.OpportunityOrderDate}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Order GM Value:
  <input
    type="number"
    name="OpportunityOrderGmValue"
    value={opportunityData.OpportunityOrderGmValue}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Order Value:
  <input
    type="number"
    name="OpportunityOrderValue"
    value={opportunityData.OpportunityOrderValue}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Organisation ID:
  <input
    type="number"
    name="OpportunityOrganisationId"
    value={opportunityData.OpportunityOrganisationId}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Percent:
  <input
    type="number"
    name="OpportunityPercent"
    value={opportunityData.OpportunityPercent}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Person ID:
  <input
    type="number"
    name="OpportunityPersonId"
    value={opportunityData.OpportunityPersonId}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Person ID 2:
  <input
    type="number"
    name="OpportunityPersonId2"
    value={opportunityData.OpportunityPersonId2}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Address:
  <input
    type="text"
    name="OpportunityAddress"
    value={opportunityData.OpportunityAddress}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Post Code:
  <input
    type="text"
    name="OpportunityPostCode"
    value={opportunityData.OpportunityPostCode}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity City:
  <input
    type="text"
    name="OpportunityCity"
    value={opportunityData.OpportunityCity}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity State:
  <input
    type="text"
    name="OpportunityState"
    value={opportunityData.OpportunityState}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Country Value:
  <input
    type="text"
    name="OpportunityCountryValue"
    value={opportunityData.OpportunityCountryValue}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Country:
  <input
    type="text"
    name="OpportunityCountry.Name"
    value={opportunityData.OpportunityCountry.Name}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Country Code ISO:
  <input
    type="text"
    name="OpportunityCountry.CodeISO"
    value={opportunityData.OpportunityCountry.CodeISO}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Country Code UN:
  <input
    type="text"
    name="OpportunityCountry.CodeUN"
    value={opportunityData.OpportunityCountry.CodeUN}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity GPS:
  <input
    type="text"
    name="OpportunityGps"
    value={opportunityData.OpportunityGps}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Product:
  <input
    type="text"
    name="OpportunityProduct"
    value={opportunityData.OpportunityProduct}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Product ID:
  <input
    type="number"
    name="OpportunityProductId"
    value={opportunityData.OpportunityProductId}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Quotation Language ID:
  <input
    type="number"
    name="OpportunityQuotationLanguageId"
    value={opportunityData.OpportunityQuotationLanguageId}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Revenue 1:
  <input
    type="number"
    name="OpportunityRevenue1"
    value={opportunityData.OpportunityRevenue1}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Revenue 2:
  <input
    type="number"
    name="OpportunityRevenue2"
    value={opportunityData.OpportunityRevenue2}
    onChange={handleChange}
  />
</label>

{/* Continue with Opportunity Revenue 3 to Opportunity Revenue 12... */}

<label>
  Opportunity Search 1:
  <input
    type="text"
    name="OpportunitySearch1"
    value={opportunityData.OpportunitySearch1}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Search 2:
  <input
    type="text"
    name="OpportunitySearch2"
    value={opportunityData.OpportunitySearch2}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Spent Time:
  <input
    type="text"
    name="OpportunitySpentTime"
    value={opportunityData.OpportunitySpentTime}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Updated At:
  <input
    type="text"
    name="OpportunityUpdatedAt"
    value={opportunityData.OpportunityUpdatedAt}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Updated By:
  <input
    type="text"
    name="OpportunityUpdatedBy"
    value={opportunityData.OpportunityUpdatedBy}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity User Group ID:
  <input
    type="number"
    name="OpportunityUserGroupId"
    value={opportunityData.OpportunityUserGroupId}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Win Percent:
  <input
    type="number"
    name="OpportunityWinPercent"
    value={opportunityData.OpportunityWinPercent}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Win Percent 2:
  <input
    type="number"
    name="OpportunityWinPercent2"
    value={opportunityData.OpportunityWinPercent2}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Win Yes No:
  <input
    type="checkbox"
    name="OpportunityWinYesNo"
    checked={opportunityData.OpportunityWinYesNo}
   // onChange={handleChangeCheckbox}
  />
</label>
<label>
  Opportunity Security Info - Can Read:
  <input
    type="checkbox"
    name="OpportunitySecurityInfo.CanRead"
    checked={opportunityData.OpportunitySecurityInfo.CanRead}
   // fixa senare  onChange={handleChangeNestedCheckbox}
  />
</label>

<label>
  Opportunity Security Info - Can Edit:
  <input
    type="checkbox"
    name="OpportunitySecurityInfo.CanEdit"
    checked={opportunityData.OpportunitySecurityInfo.CanEdit}
   // fixa senare onChange={handleChangeNestedCheckbox}
  />
</label>

<label>
  Opportunity Plus 1:
  <input
    type="text"
    name="OpportunityPlus1"
    value={opportunityData.OpportunityPlus1}
    onChange={handleChange}
  />
</label>

<label>
  Opportunity Plus 2:
  <input
    type="text"
    name="OpportunityPlus2"
    value={opportunityData.OpportunityPlus2}
    onChange={handleChange}
  />
</label>

{/* Continue adding similar input elements for Opportunity Plus 3 to Opportunity Plus 20 */}

<label>
  Opportunity Custom 1:
  <input
    type="text"
    name="OpportunityCustom1"
    value={opportunityData.OpportunityCustom1}
    onChange={handleChange}
  />
</label>

{/* Continue adding similar input elements for Opportunity Custom 2 to Opportunity Custom 15 */}

<label>
  Opportunity Memo:
  <input
    type="text"
    name="OpportunityMemo"
    value={opportunityData.OpportunityMemo}
    onChange={handleChange}
  />
</label>
  
      {/* Continue with the rest of the fields... */}
  
      <button type="submit" disabled={submitting}>
        Create Opportunity
      </button>
  
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
  
};

export default AddOpportunity;

