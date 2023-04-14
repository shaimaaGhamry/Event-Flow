import React from 'react';


const SignUp = () => {
  return (
    <div class="hero is-fullheight">
         <h2>SignUp</h2>
            <div class="hero-body is-justify-content-center is-align-items-center">
                <div class="columns is-flex is-flex-direction-column box">
                <div class="column">
                        <label for="email">First Name</label>
                        <input class="input is-primary" type="text" placeholder="First Name"></input>
                    </div>
                    <div class="column">
                        <label for="email">Last Name</label>
                        <input class="input is-primary" type="text" placeholder="Email address"></input>
                    </div>
                    <div class="column">
                        <label for="email">Email</label>
                        <input class="input is-primary" type="text" placeholder="Last Name"></input>
                    </div>
                    <div class="column">
                        <label for="Name">Password</label>
                        <input class="input is-primary" type="password" placeholder="Password"></input>
                            <a href="forget.html" class="is-size-7 has-text-primary"></a>
                    </div>
                    <div class="column">
                        <label for="Name">Enter Password Again</label>
                        <input class="input is-primary" type="password" placeholder="Password"></input>
                            <a href="forget.html" class="is-size-7 has-text-primary"></a>
                    </div>
                    <div class="column">
                        <button class="button is-primary is-fullwidth" type="submit">Signup <a href='/myevents'></a>
                        </button>
                    </div>
                    <div class="has-text-centered">
                        <p class="is-size-7"> Already have an account? <a href='/loginform' class="has-text-primary">Login</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default SignUp