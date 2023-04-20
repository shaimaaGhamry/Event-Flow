import React, { useState } from 'react';

import { Link } from 'react-router-dom';

import { useMutation } from "@apollo/client";

import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth';

const LoginForm = () => {

  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
    } catch (e) {
      console.error(e);
    }

    // clear form values
    setFormState({
      email: '',
      password: '',
    });
  };


  return (

    <section class="hero  is-fullheight is-fullwidth">

      <div class="hero-body is-justify-content-center is-align-items-center">
        <div class="columns is-flex is-flex-direction-column box">
          <div class="box">
            {data ? (
              <p>
                Success! You may view{' '}
                <Link to="/myevents">your events</Link>
              </p>
            ) : (
              <form onSubmit={handleFormSubmit}>

                <label for="" class="label">Email</label>
                <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input is-primary" required
                  name="email" value={formState.email} onChange={handleChange}>
                </input>

                <div class="field">
                  <label for="" class="label">Password</label>
                  <input type="password" placeholder="*******" class="input is-primary" required
                    name="password" value={formState.password}
                    onChange={handleChange} >

                  </input>

                </div>
                <div class="field">
                  <label for="" class="checkbox">
                    <input type="checkbox"></input>
                    Remember me
                  </label>
                </div>
                <div class="field">
                  <button class="button is-success is-primary is-fullwidth" type="submit">
                    Login
                  </button>
                </div>
                <div class="has-text-centered">
                  <p class="is-size-7"> Don't have an account? <a href='./SignUp' class="has-text-primary">Sign up</a>
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
    </section>

  )
};

export default LoginForm;