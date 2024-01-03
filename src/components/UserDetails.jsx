// UserList.js

import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { setCredentials } from '../slices/authSlice';
import authSlice from '../slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.userInfo);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch token from your Redux state
        const token = userInfo ? userInfo.accessToken : null;

        const response = await axios.get('https://localhost:5001/api/userlist', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userInfo]);

  const handleAddUserClick = () => {
    // Navigate to the create page
    navigate('/create');
  };

  const handleDeleteUser = async (userId) => {
    try {
      const token = userInfo ? userInfo.accessToken : null;

      await axios.delete(`https://localhost:5001/api/userlist/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const handleEditUser = (userId) => {
   
    navigate(`/edit/${userId}`);
  };

  return (
    <div>
      <h2>User List</h2>
      <button onClick={handleAddUserClick} style={addButtonStyle}>
        +
      </button>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
        <thead style={{ backgroundColor: '#f2f2f2' }}>
          <tr>
            <th style={tableHeaderStyle}>First Name</th>
            <th style={tableHeaderStyle}>Last Name</th>
            <th style={tableHeaderStyle}>Username</th>
            <th style={tableHeaderStyle}>Email</th>
            <th style={tableHeaderStyle}>ID</th>
            <th style={tableHeaderStyle}>Actions</th> {/* New columns for delete and edit buttons */}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={tableCellStyle}>{user.firstName}</td>
              <td style={tableCellStyle}>{user.lastName}</td>
              <td style={tableCellStyle}>{user.userName}</td>
              <td style={tableCellStyle}>{user.email}</td>
              <td style={tableCellStyle}>{user.id}</td>
              <td style={tableCellStyle}>
                <button onClick={() => handleDeleteUser(user.id)} style={deleteButtonStyle}>
                  Delete
                </button>
                <button onClick={() => handleEditUser(user.id)} style={editButtonStyle}>
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const addButtonStyle = {
  backgroundColor: '#4CAF50',
  border: 'none',
  color: 'white',
  padding: '15px 32px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '16px',
  margin: '4px 2px',
  cursor: 'pointer',
  borderRadius: '4px',
};

const deleteButtonStyle = {
  backgroundColor: '#f44336',
  border: 'none',
  color: 'white',
  padding: '10px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '12px',
  cursor: 'pointer',
  borderRadius: '4px',
};

const editButtonStyle = {
  backgroundColor: '#2196F3',
  border: 'none',
  color: 'white',
  padding: '10px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'inline-block',
  fontSize: '12px',
  cursor: 'pointer',
  borderRadius: '4px',
};

const tableHeaderStyle = {
  padding: '12px',
  textAlign: 'left',
  borderBottom: '1px solid #ddd',
};

const tableCellStyle = {
  padding: '10px',
  textAlign: 'left',
};

export default UserList;
