import React, { useState } from 'react';

import { Form, Button, Notification } from 'react-bulma-components';
import { useMutation } from "@apollo/client";

import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' })
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    
    const [login] = useMutation(LOGIN_USER);
    
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
      const { data } = await login({
        variables: { ...userFormData },
      });
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
    setUserFormData({
      username: '',
      email: '',
      password: '',
    });
  };
    render (); {
    return (
        <section class="hero  is-fullheight is-fullwidth">
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
            <Notification dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='is-danger'>
               Something went wrong with your login credentials!
            </Notification>
        <Form.Group className='hero-body is-justify-content-center is-align-items-center'>
            <Form.Label htmlFor='email'>Email</Form.Label>
            <Form.Control
               type='text'
               placeholder='e.g. bobsmith@gmail.com'
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
            placeholder='******' 
            class="input is-primary"
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>
         <Button class="button is-success is-primary is-fullwidth"
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success is-primary'>
          Login
        </Button>
        <div class="has-text-centered">
             <p class="is-size-7"> Don't have an account? <a href='./SignUp' class="has-text-primary">Sign up</a>
             </p>
        </div>
       </Form>
     </section>
    
);
                    
};
};

              export default LoginForm;