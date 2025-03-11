import React, { useEffect, useState } from 'react';
import { getAllUsers } from '../api/api';

function Dashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const result = await getAllUsers();
      if (result?.users) {
        setUsers(result.users);
      }
    }

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((u, index) => (
          <li key={index}>{u}</li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;


import { getToken } from './AuthService';

fetch("http://localhost:3000/api/users/me", {
  headers: {
    'Authorization': `Bearer ${getToken()}`
  }
});
