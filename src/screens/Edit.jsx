// Update.js

import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useParams, useNavigate } from 'react-router-dom';
import { useGetUserByIdQuery, useUpdateUserMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Edit = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch user data by ID
  const { data: userInfo, error: userError, isLoading: userLoading } = useGetUserByIdQuery(id);

  // State to manage form input values
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  // Mutation hook to update user data
  const [updateUser, { isLoading: updateLoading }] = useUpdateUserMutation();

  // Populate form fields with existing user data when available
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if there are values in local storage
        const storedUserData = localStorage.getItem('userInfo');

        if (storedUserData) {
          // If values exist in local storage, parse and use them
          const parsedUserData = JSON.parse(storedUserData);
          setUsername(parsedUserData.userName || '');
          setFirstname(parsedUserData.firstName || '');
          setLastname(parsedUserData.lastName || '');
          setEmail(parsedUserData.email || '');
        } else if (userInfo) {
          // If no values in local storage, use data fetched from API
          setUsername(userInfo.userName);
          setFirstname(userInfo.firstName);
          setLastname(userInfo.lastName);
          setEmail(userInfo.email);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, [userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      // Call the update mutation hook to update user data
      await updateUser({ id, username, firstname, lastname, email });

      // Notify user about the successful update
      toast.success('User updated successfully!');

      // Redirect back to the user list page or any other desired page
      navigate('/UserDetails');
    } catch (err) {
      // Notify user about any errors during the update process
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Edit User</h1>
      {userLoading ? (
        <Loader />
      ) : (
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='username'>
            <Form.Label>Username</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='firstname'>
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter first name'
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='lastname'>
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type='text'
              placeholder='Enter last name'
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId='email'>
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Button type='submit' variant='primary' className='mt-3' disabled={updateLoading}>
            Update User
          </Button>
        </Form>
      )}
    </FormContainer>
  );
};

export default Edit;
