import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function OngoingTasks() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response = await axios.get('https://localhost:7042/WorkTask/user/2');
                setTasks(response.data);
            } catch (error) {
                console.error('Error fetching tasks:', error);
            }
        };
        fetchTasks();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Pågående Uppdrag</h2>
            {tasks.map(task => (
                <div key={task.id} className="card mb-3">
                    <div className="card-header bg-primary text-white">
                        Task ID: {task.id}
                    </div>
                    <div className="card-body">
                        <h5 className="card-title">{task.company}</h5>
                        <p className="card-text">
                            <strong>Contact Person:</strong> {task.contactPerson}
                        </p>
                        <p className="card-text">
                            <strong>Order Date:</strong> {new Date(task.orderDate).toLocaleDateString()}
                        </p>
                        <p className="card-text">
                            <strong>Hours Worked:</strong> {task.hoursWorked}
                        </p>
                        {/* Add other task details here */}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default OngoingTasks;

