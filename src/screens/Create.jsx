import { useState, useEffect } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import FormContainer from '../components/FormContainer';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Create = () => {
  const [username, setUsername] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  

  const dispatch = useDispatch();
const navigate = useNavigate();

const [register, { isLoading }] = useRegisterMutation();

const { userInfo } = useSelector((state) => state.auth);



  const submitHandler = async (e) => {
  e.preventDefault();

  if (password == null) {
    toast.error('Passwords do not empty');
  } else {
    try {
      const res = await register({ username, firstname,lastname,email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  }
};

  return (
    <FormContainer>
      <h1>Register</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className='my-2' controlId='username'>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group className='my-2' controlId='firstname'>
          <Form.Label>FirstName</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Firstname'
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          ></Form.Control>
        </Form.Group>


        <Form.Group className='my-2' controlId='lastname'>
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type='name'
            placeholder='Enter Lastname'
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='email'>
          <Form.Label>Email Address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Form.Group className='my-2' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>
        
        {
     isLoading && <Loader />
        }
        <Button type='submit' variant='primary' className='mt-3'>
          Create User
        </Button>
      </Form>

      
    </FormContainer>
  );
};

export default Create;