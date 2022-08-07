import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";

//import Image from 'next/image'

import styles from '../styles/Login.module.css'

function LoginPage() {
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
  });

  const router = useRouter();

  const handleChange = (e) => {
      setCredentials({
          ...credentials,
          [e.target.name]: e.target.value,
      })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("/api/auth/login", credentials);
      //console.log(res);

      if (res.status === 200) {
        router.push("/dashboard");
      }
    }
    catch (err) {
      console.error(err)
    }
  };

  return (
      <section className="bg-dark text-white vh-100">
        <div className="container py-5 h-100">
          <div className="row d-flex align-items-center justify-content-center h-100">
            <div className="col-md-8 col-lg-7 col-xl-6">
              <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
                className="img-fluid" alt="Phone image"/>
            </div>
            <div className="col-md-7 col-lg-5 col-xl-5 offset-xl-1">
              <form onSubmit={handleSubmit}>
                
                {/* Email input */}
                <div className="form-outline mb-4">
                  <input 
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    onChange={handleChange}
                      id="form1Example13" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form1Example13">Email address</label>
                </div>

                {/* Password input */}
                <div className="form-outline mb-4">
                  <input 
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    id="form1Example23" className="form-control form-control-lg" />
                  <label className="form-label" htmlFor="form1Example23">Password</label>
                </div>

                <div className="d-flex justify-content-around align-items-center mb-4">
                  {/* Checkbox */}
                  <div className="form-check">
                    <input className="form-check-input" 
                      type="checkbox" 
                      onChange={ () => { } }
                      value="" id="form1Example3" checked />
                    <label className="form-check-label" htmlFor="form1Example3"> Remember me </label>
                  </div>
                  <a href="#!">Forgot password?</a>
                </div>

                {/* Submit button */}
                <button type="submit" className="btn btn-block btn-primary btn-lg">Sign in</button>

                <div className="divider d-flex align-items-center my-4">
                  <p className="text-center fw-bold mx-3 mb-0 text-muted">OR</p>
                </div>
{/*
                <a className="btn btn-primary btn-lg btn-block" style="background-color: #3b5998" href="#!"
                  role="button">
                  <i className="fab fa-facebook-f me-2"></i>Continue with Facebook
                </a>
                <a className="btn btn-primary btn-lg btn-block" style="background-color: #55acee" href="#!"
                  role="button">
                  <i className="fab fa-twitter me-2"></i>Continue with Twitter</a>
*/}
              </form>
            </div>
          </div>
        </div>
      </section>
  );
}

export default LoginPage;