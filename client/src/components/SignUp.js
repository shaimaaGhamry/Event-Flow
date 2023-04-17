import React from 'react';
import { Form, Button, Alert } from 'react-bulma';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth';
//import myevents.js, loginform.js

const Signup = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);

  const [addUser, { error }] = useMutation(ADD_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  
    const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { ...userFormData },
      });
      Auth.login(data.addUser.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    };

    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };
  //test and change to first name, last name (check with team)
  return (
      <div class="hero is-fullheight">
         <h2>SignUp</h2>
         {/* This is needed for the validation functionality above */}
         <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
         {/* show alert if server response is bad */}
           <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='is-danger'>
             Something went wrong with your signup!
           </Alert>
         <Form.Group className='hero-body is-justify-content-center is-align-items-center'>
          <Form.Label htmlFor='username'>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your Username'
            class="input is-primary"
            name='username'
            onChange={handleInputChange}
            value={userFormData.username}
            required
          />
          <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
        </Form.Group>

         <Form.Group className='hero-body is-justify-content-center is-align-items-center'>
          <Form.Label htmlFor='email'>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='Your email address'
            class="input is-primary"
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

         <Form.Group className='hero-body is-justify-content-center is-align-items-center'>
          <Form.Label htmlFor='password'>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            class="input is-primary"
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
     
        <Button class="button is-primary is-fullwidth"
          disabled={!(userFormData.username && userFormData.email && userFormData.password)}
          type='submit'
          variant='success is-primary'>
          Sign Up
          <a href='/myevents'></a>
        </Button>
    </div>
      <div class="has-text-centered">
           <p class="is-size-7"> Already have an account? <a href='/loginform' class="has-text-primary">Login</a>
           </p>
      </div>
  )
}

export default SignUp
