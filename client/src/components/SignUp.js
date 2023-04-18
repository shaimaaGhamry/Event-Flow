import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';



const SignUp = () => {
  const [formState, setFormState] = useState({
    userName: '',
    email: '',
    password: '',
  });
  const [addUser, { error, data }] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(formState);

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });
     console.log(data);
      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="hero is-fullheight">
      <h2>SignUp</h2>
      <div className="hero-body is-justify-content-center is-align-items-center">
        <div className="columns is-flex is-flex-direction-column box">
        {data ? (
              <p>
                Success! You may now{' '}
                <Link to="/">go to the hompage</Link>
              </p>
            ) : (
          <form onSubmit={handleFormSubmit}>
            <div className="column">
              <label for="email">Name</label>
              <input className="input is-primary" type="text" placeholder="Name"
                name="userName" value={formState.name} onChange={handleChange}>
              </input>
            </div>
            {/* <div class="column">
              <label for="email">Last Name</label>
              <input class="input is-primary" type="text" placeholder="Email address"
              name="email" value={formState.email}
              onChange={handleChange} >
              </input>
            </div> */}
            <div className="column">
              <label for="email">Email</label>
              <input className="input is-primary" type="text" placeholder="Last Name"
              name="email"  value={formState.email}
              onChange={handleChange}>
              </input>
            </div>
            <div className="column">
              <label for="Name">Password</label>
              <input className="input is-primary" type="password" placeholder="Password"
              name="password" value={formState.password}
              onChange={handleChange} >
              </input>
            </div>
            <div className="column">
              <label for="Name">Password Again</label>
              <input className="input is-primary" type="password" placeholder="Password"
              name="password" value={formState.password}
              onChange={handleChange} >
              </input>
            </div>
            <div className="column">
              <button className="button is-primary is-fullwidth" type="submit"><a href='/myevents'>Signup </a>
              </button>
            </div>
            <div className="has-text-centered">
              <p className="is-size-7"> Already have an account? <a href='/loginform' className="has-text-primary">Login</a>
              </p>
            </div>
          </form>
            )}

          {error && (
              <div className="my-3 p-3 is-danger text-white">
                {error.message}
              </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SignUp