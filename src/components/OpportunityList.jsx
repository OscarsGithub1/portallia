import React, { Component } from 'react';
import axios from 'axios';

class OpportunityList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      opportunities: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    // Retrieve the API key from local storage
    const apiKey = localStorage.getItem('token');

    // Ensure there's an apiKey available
    if (!apiKey) {
      this.setState({
        error: 'API-nyckeln saknas.',
        loading: false,
      });
      return;
    }

    const apiUrl = 'https://api.webcrm.com/Opportunities?Page=1&Size=50&include=SecurityInfo';

    // Use the API key from local storage in the Authorization header
    const headers = {
      Authorization: `Bearer ${apiKey}`,
    };

    axios
      .get(apiUrl, { headers })
      .then((response) => {
        this.setState({
          opportunities: response.data,
          loading: false,
        });
      })
      .catch((error) => {
        this.setState({
          error: 'Något gick fel vid hämtning av data.',
          loading: false,
        });
        console.error('Error fetching opportunities:', error);
      });
  }

  render() {
    const { opportunities, loading, error } = this.state;

    if (loading) {
      return <div>Laddar data...</div>;
    }

    if (error) {
      return <div>{error}</div>;
    }

    return (
      <div>
        <h1>Avtal/Order</h1>
        <ul>
          {opportunities.map((opportunity) => (
            <li key={opportunity.OpportunityId}>
                <h1>Detta är avtal/Order</h1>
              <strong>ID:</strong> {opportunity.OpportunityId}<br />
              <strong>Beskrivning:</strong> {opportunity.OpportunityDescription}<br />
              <strong>Skapad av:</strong> {opportunity.OpportunityCreatedBy}<br />
              <strong>Skapad datum:</strong> {opportunity.OpportunityCreatedAt}<br />
              <br />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default OpportunityList;
