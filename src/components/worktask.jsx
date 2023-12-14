import React, { useState } from 'react';

const NewWorkTaskCard = () => {
  const [company, setCompany] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [orderDate, setOrderDate] = useState('');
  const [currency, setCurrency] = useState('');
  const [pipelineLevel, setPipelineLevel] = useState('');
  const [salesResponsible, setSalesResponsible] = useState('');
  const [description, setDescription] = useState('');
  const [scopePercentage, setScopePercentage] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [role, setRole] = useState('');
  const [assignmentDescription, setAssignmentDescription] = useState('');
  const [competenceRequirements, setCompetenceRequirements] = useState('');
  const [otherRequirements, setOtherRequirements] = useState('');
  const [placement, setPlacement] = useState('');
  const [pricePerHour, setPricePerHour] = useState('');

  const handleCreateTask = (event) => {
    event.preventDefault();

    const newWorkTask = {
      company,
      contactPerson,
      orderDate,
      currency,
      pipelineLevel,
      salesResponsible,
      description,
      scopePercentage,
      startDate,
      endDate,
      dueDate,
      role,
      assignmentDescription,
      competenceRequirements,
      otherRequirements,
      placement,
      pricePerHour,
    };

    console.log('New work task created:', newWorkTask);

    // Reset the form after submission
    setCompany('');
    setContactPerson('');
    setOrderDate('');
    setCurrency('');
    setPipelineLevel('');
    setSalesResponsible('');
    setDescription('');
    setScopePercentage('');
    setStartDate('');
    setEndDate('');
    setDueDate('');
    setRole('');
    setAssignmentDescription('');
    setCompetenceRequirements('');
    setOtherRequirements('');
    setPlacement('');
    setPricePerHour('');
  };

  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Create a New Work Task</h5>
        <form onSubmit={handleCreateTask}>
          {/* ... existing fields ... */}

          {/* Pipeline Level */}
          <div className="mb-3">
            <label htmlFor="pipelineLevel" className="form-label">
              Pipeline Level
            </label>
            <input
              type="text"
              className="form-control"
              id="pipelineLevel"
              value={pipelineLevel}
              onChange={(e) => setPipelineLevel(e.target.value)}
              required
            />
          </div>

          {/* Sales Responsible */}
          <div className="mb-3">
            <label htmlFor="salesResponsible" className="form-label">
              Sales Responsible
            </label>
            <input
              type="text"
              className="form-control"
              id="salesResponsible"
              value={salesResponsible}
              onChange={(e) => setSalesResponsible(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Scope Percentage */}
          <div className="mb-3">
            <label htmlFor="scopePercentage" className="form-label">
              Scope Percentage
            </label>
            <input
              type="text"
              className="form-control"
              id="scopePercentage"
              value={scopePercentage}
              onChange={(e) => setScopePercentage(e.target.value)}
              required
            />
          </div>

          {/* Start Date */}
          <div className="mb-3">
            <label htmlFor="startDate" className="form-label">
              Start Date
            </label>
            <input
              type="date"
              className="form-control"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              required
            />
          </div>

          {/* End Date */}
          <div className="mb-3">
            <label htmlFor="endDate" className="form-label">
              End Date
            </label>
            <input
              type="date"
              className="form-control"
              id="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              required
            />
          </div>

          {/* Due Date */}
          <div className="mb-3">
            <label htmlFor="dueDate" className="form-label">
              Due Date
            </label>
            <input
              type="date"
              className="form-control"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          {/* Role */}
          <div className="mb-3">
            <label htmlFor="role" className="form-label">
              Role
            </label>
            <input
              type="text"
              className="form-control"
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            />
          </div>

          {/* Assignment Description */}
          <div className="mb-3">
            <label htmlFor="assignmentDescription" className="form-label">
              Assignment Description
            </label>
            <textarea
              className="form-control"
              id="assignmentDescription"
              value={assignmentDescription}
              onChange={(e) => setAssignmentDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Competence Requirements */}
          <div className="mb-3">
            <label htmlFor="competenceRequirements" className="form-label">
              Competence Requirements
            </label>
            <textarea
              className="form-control"
              id="competenceRequirements"
              value={competenceRequirements}
              onChange={(e) => setCompetenceRequirements(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Other Requirements */}
          <div className="mb-3">
            <label htmlFor="otherRequirements" className="form-label">
              Other Requirements
            </label>
            <textarea
              className="form-control"
              id="otherRequirements"
              value={otherRequirements}
              onChange={(e) => setOtherRequirements(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Placement */}
          <div className="mb-3">
            <label htmlFor="placement" className="form-label">
              Placement
            </label>
            <input
              type="text"
              className="form-control"
              id="placement"
              value={placement}
              onChange={(e) => setPlacement(e.target.value)}
              required
            />
          </div>

          {/* Price Per Hour */}
          <div className="mb-3">
            <label htmlFor="pricePerHour" className="form-label">
              Price Per Hour
            </label>
            <input
              type="text"
              className="form-control"
              id="pricePerHour"
              value={pricePerHour}
              onChange={(e) => setPricePerHour(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary">
            Create Task
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewWorkTaskCard;
