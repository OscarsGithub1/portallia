import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Import your image with a relative path
import backgroundImage from '../assets/images/shutterstock_247784356.jpg';

const backgroundStyle = {
  backgroundImage: `url(${backgroundImage})`, // Set the background image using the imported path
  backgroundSize: 'cover', // Adjust background size to cover the container
  backgroundRepeat: 'no-repeat', // Prevent background image from repeating
  backgroundAttachment: 'fixed', // Fix the background in place
  minHeight: '100vh', // Set a minimum height to cover the entire viewport
};

const Deals = () => {
  const [workTasks, setWorkTasks] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://localhost:7042/WorkTask');
        setWorkTasks(response.data);
      } catch (error) {
        console.error('Error fetching data: ', error);
        // Handle error here
      }
    };

    fetchData();
  }, []);

  return (
    <div style={backgroundStyle}>
      <div className="container mt-4">
        <h2>Business Opportunities</h2>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>ID</th>
              <th>Company</th>
              <th>Contact Person</th>
              <th>Order Date</th>
              <th>Sales Responsible</th>
              <th>Description</th>
              <th>Totalvärde</th>
              <th>Avtal Ansvarig</th>
              <th>Avtal Kontakt</th>
            </tr>
          </thead>
          <tbody>
            {workTasks.map((task, index) => (
              <tr key={index}>
                <td>{task.id}</td>
                <td>{task.company}</td>
                <td>{task.contactPerson}</td>
                <td>{new Date(task.orderDate).toLocaleDateString()}</td>
                <td>{task.salesResponsible}</td>
                <td>{task.description}</td>
                <td>{task.totalvärde}</td>
                <td>{task.avtalAnsvarig}</td>
                <td>{task.avtalKontakt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deals;
