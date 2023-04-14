import React from 'react';

const LoginForm = () => {
    return (
        <section class="hero  is-fullheight is-fullwidth">
        <div class="hero-body is-justify-content-center is-align-items-center">
            <div class="columns is-flex is-flex-direction-column box">
                <form action="" class="box">
                    <div class="field">
                        <label for="" class="label">Email</label>
                        <input type="email" placeholder="e.g. bobsmith@gmail.com" class="input is-primary" required></input>
                    </div>
                    <div class="field">
                        <label for="" class="label">Password</label>
                        <input type="password" placeholder="*******" class="input is-primary" required></input>
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
            </div>
        </div>
    </section>
)
                    
};


                    export default LoginForm;