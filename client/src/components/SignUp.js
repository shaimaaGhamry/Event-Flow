import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';

import Auth from '../utils/auth';



const SignUp = () => {
  const [formState, setFormState] = useState({
    username: '',
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

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div class="hero is-fullheight">
      <h2>SignUp</h2>
      <div class="hero-body is-justify-content-center is-align-items-center">
        <div class="columns is-flex is-flex-direction-column box">
        {data ? (
              <p>
                Success! You may now{' '}
                <Link to="/">go to the hompage</Link>
              </p>
            ) : (
          <form onSubmit={handleFormSubmit}>
            <div class="column">
              <label for="email">Name</label>
              <input class="input is-primary" type="text" placeholder="Name"
                name="username" value={formState.name} onChange={handleChange}>
              </input>
            </div>
            {/* <div class="column">
              <label for="email">Last Name</label>
              <input class="input is-primary" type="text" placeholder="Email address"
              name="email" value={formState.email}
              onChange={handleChange} >
              </input>
            </div> */}
            <div class="column">
              <label for="email">Email</label>
              <input class="input is-primary" type="text" placeholder="Last Name"
              name="email"  value={formState.email}
              onChange={handleChange}>
              </input>
            </div>
            <div class="column">
              <label for="Name">Password</label>
              <input class="input is-primary" type="password" placeholder="Password"
              name="password" value={formState.password}
              onChange={handleChange} >
              </input>
            </div>
            <div class="column">
              <label for="Name">Password Again</label>
              <input class="input is-primary" type="password" placeholder="Password"
              name="password" value={formState.password}
              onChange={handleChange} >
              </input>
            </div>
            <div class="column">
              <button class="button is-primary is-fullwidth" type="submit">Signup <a href='/myevents'></a>
              </button>
            </div>
            <div class="has-text-centered">
              <p class="is-size-7"> Already have an account? <a href='/loginform' class="has-text-primary">Login</a>
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