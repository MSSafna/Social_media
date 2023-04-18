
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// const SIGNUP_URL='/auth/register'
function signup() {
  const initialValues = {
    name: '', email: '', number: '', password: '', confirmPassword: '',
  };
  const navigate = useNavigate();
  const [values, setValues] = useState(initialValues);
  const [formErrors, setFormError] = useState({});
  const [boolean, setBoolean] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [confirmBoolean, setConfirmBoolean] = useState(false);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && submit) {
      axios.post(
        '/api/user/register',
        { ...values },

        { withCredentials: true },
      ).then((response) => {
        if (response.data.email) {
          toast.error('email already exist');
        } else if (response.data.name) {
          toast.error('username already exist');
        } else {
          toast('Successfully account created');
          setTimeout(() => {
            navigate('/home');
          }, 5000);
        }
      }).catch((error) => {
      });
    }
  }, [formErrors]);

  const handleFormSubmit = ((e) => {
    e.preventDefault();
    // eslint-disable-next-line no-use-before-define
    setFormError(validateForm(values));
    setSubmit(true);
  });

  const passwordView = ((e) => {
    { !boolean ? setBoolean(true) : setBoolean(false); }
  });
  const confirmPasswordView = ((e) => {
    { !confirmBoolean ? setConfirmBoolean(true) : setConfirmBoolean(false); }
  });

  const validateForm = ((formValues) => {
    const error = {};
    const regexemail = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    const regexnumber = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
    if (!formValues.name) {
      error.name = 'Enter your name';
    }
    if (!formValues.email) {
      error.email = 'Enter your email';
    } else if (!regexemail.test(formValues.email)) {
      error.email = 'Invalid email format';
    }

    if (!formValues.number) {
      error.number = 'Enter your number';
    } else if (!regexnumber.test(formValues.number)) {
      error.number = 'Enter valid number';
    }
    if (!formValues.password) {
      error.password = 'Enter your password';
    }
    if (!formValues.confirmPassword) {
      error.confirmPassword = 'Re-enter your password';
    } else if (formValues.confirmPassword !== formValues.password) {
      error.confirmPassword = 'Password wrong';
    }
    return error;
  });

  return (
    <div>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        {/* login container */}
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          {/* form */}
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Signup</h2>
            <ToastContainer />
            <form action className="flex flex-col gap-2" onSubmit={handleFormSubmit}>
              <input
                className="p-2 mt-8 rounded-xl border"
                type="text"
                name="name"
                placeholder="Fullname"
                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
              />
              <p style={{ color: 'red' }}>{formErrors.name}</p>
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type="tel"
                  name="number"
                  placeholder="Phone number"
                  onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                />
                <p style={{ color: 'red' }}>{formErrors.number}</p>
              </div>
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                />
                <p style={{ color: 'red' }}>{formErrors.email}</p>
              </div>
              
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type={boolean ? 'text' : 'password'}
                  name="password"
                  placeholder=" Enter Password"
                  onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                />
                <p style={{ color: 'red' }}>{formErrors.password}</p>
                {!boolean
                  && (
                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="gray" className="bi bi-eye  absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16" onClick={passwordView}>
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                  )}
                {boolean
                  && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16" onClick={passwordView}>
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                  </svg>
                  )}
              </div>

              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type={confirmBoolean ? 'text' : 'password'}
                  name="confirmPassword"
                  placeholder=" Confirm Password"
                  onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                />
                <p style={{ color: 'red' }}>{formErrors.confirmPassword}</p>
                {!confirmBoolean
                  && (
                  <svg xmlns="http://www.w3.org/2000/svg" width={16} height={16} fill="gray" className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16" onClick={confirmPasswordView}>
                    <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                    <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                  </svg>
                  )}

                {confirmBoolean
                  && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2" viewBox="0 0 16 16" onClick={confirmPasswordView}>
                    <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                    <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                    <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                  </svg>
                  )}

              </div>
              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300">Signup</button>
            </form>
            <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
              <hr className="border-gray-400" />
              <p className="text-center text-sm">OR</p>
              <hr className="border-gray-400" />
            </div>
            <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
              <p>Already have an account?</p>
              <button className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300"><Link to="/">Login</Link></button>
            </div>
          </div>
          {/* image */}
          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src="images/arrival.png" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default signup;
