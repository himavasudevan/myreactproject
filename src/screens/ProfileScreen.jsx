import React, { useState, useEffect } from 'react';
import { Form, Button } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { useDispatch, useSelector } from 'react-redux';
import { useUpdateUserMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const ProfileScreen = () => {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  // Mutation hook to update user profile
  const [updateProfile, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    setUsername(userInfo.userName);
    setEmail(userInfo.email);
    setFirstname(userInfo.firstName);
    setLastname(userInfo.lastName);
  }, [userInfo.userName, userInfo.email, userInfo.firstName, userInfo.lastName]);

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await updateProfile({
        _id: userInfo._id,
        username,
        firstname,
        lastname,
        email,
        password,
      }).unwrap();

      // Update the Redux state with the new user information
      dispatch(setCredentials({ ...res }));

      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1>Your Profile</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className='my-2' controlId='firstname'>
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Firstname'
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='lastname'>
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Lastname'
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {isLoading && <Loader />}

        
      </Form>
    </FormContainer>
  );
};

export default ProfileScreen;
