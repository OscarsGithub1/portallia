import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserWorkStats = () => {
  const [userId, setUserId] = useState(null);
  const [stats, setStats] = useState({ completedTasksCount: 0, ongoingTasksCount: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (userId) {
      const fetchWorkTasksStats = async () => {
        try {
          const response = await axios.get(`https://localhost:7042/WorkTask/userWorkTasksStatus/${userId}`);
          setStats(response.data);
        } catch (error) {
          console.error('Error fetching work tasks stats:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchWorkTasksStats();
    }
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <div className="card text-dark bg-light mb-2">
        <div className="card-header">Prestationsmätare</div>
        <div className="card-body">
          <h5 className="card-title">Summary</h5>
          <p className="card-text">Pågående uppdrag: {stats.ongoingTasksCount}</p>
          <p className="card-text">Avslutade uppdrag: {stats.completedTasksCount}</p>
        </div>
      </div>
    </div>
  );
};

export default UserWorkStats;
