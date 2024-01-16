import React from 'react';

const BusinessOpportunities = () => {
  // Single hardcoded sample data
  const opportunity = {
    id: 2790,
    nummer: '2790',
    namn: 'LIA EuroBonus AB',
    beskrivning: 'LIA3 Dokumentation SAP',
    datum: '2024-01-15',
    Totalvärde: '0',
    Pipelinesnivå: '1',
    försäljningsansvarig: 'Anna Almén'
  };

  return (
    <div className="container mt-4">
      <h2>Business Opportunities</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th scope="col">Nummer</th>
            <th scope="col">För. Namn</th>
            <th scope="col">Beskrivning</th>
            <th scope="col">Datum</th>
            <th scope="col">Totalvärde</th>
            <th scope="col">Pipelinesnivå</th>
            <th scope="col">Försäljningsansvarig</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">{opportunity.nummer}</th>
            <td>{opportunity.namn}</td>
            <td>{opportunity.beskrivning}</td>
            <td>{opportunity.datum}</td>
            <td>{opportunity.Totalvärde}</td>
            <td>{opportunity.Pipelinesnivå}</td>
            <td>{opportunity.försäljningsansvarig}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BusinessOpportunities;
