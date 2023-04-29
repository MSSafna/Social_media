
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../../Components/Admin/dashboard/Sidebar';
import 'react-toastify/dist/ReactToastify.css';

function login() {
  const navigate = useNavigate();
  const [boolean, setBoolean] = useState(false);
  const initialValues = { email: '', password: '' };
  const [values, setValues] = useState(initialValues);
  const [formErrors, setFormErros] = useState({});
  const [isSubmit, setSubmit] = useState(false);

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      axios.post(
        '/api/admin',
        { ...values },
        { withCredentials: true },
      ).then((response) => {
        if (response.data == 'adminLogged') {
          navigate('/admin-view-dashboard');
        } 
         else {
          toast.error('Invalid login details');
        }
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [formErrors]);
  const handleForm = ((e) => {
    e.preventDefault();
    setFormErros(validate(values));
    setSubmit(true);
  });
  const validate = ((formValues) => {
    console.log(formValues);
    const errors = {};
    const { email, password } = formValues;
    if (!email) {
      errors.email = 'enter your email';
    }
    if (!password) {
      errors.password = 'enter your password';
    }

    return errors;
  });

  return (
    <div>
      <section className="bg-gray-50 min-h-screen flex items-center justify-center">
        {/* login container */}
        <div className="bg-gray-100 flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">
          {/* form */}
          <div className="md:w-1/2 px-8 md:px-16">
            <h2 className="font-bold text-2xl text-[#002D74]">Admin Login</h2>
            <ToastContainer />
            <form action className="flex flex-col gap-4" onSubmit={handleForm}>
              <input
                className="p-2 mt-8 rounded-xl border"
                type="email"
                name="email"
                placeholder="Email"
                onChange={(e) => {
                  setValues({ ...values, [e.target.name]: e.target.value });
                }}
              />
              <p style={{ color: 'red' }}>{formErrors.email}</p>
              <div className="relative">
                <input
                  className="p-2 rounded-xl border w-full"
                  type={boolean ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  onChange={(e) => {
                    setValues({ ...values, [e.target.name]: e.target.value });
                  }}
                />
                <p style={{ color: 'red' }}>{formErrors.password}</p>
                {!boolean
                && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  fill="gray"
                  className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    setBoolean(true);
                  }}
                >
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                </svg>
                )}

                {boolean
                && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-eye-slash absolute top-1/2 right-3 -translate-y-1/2"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    setBoolean(false);
                  }}
                >
                  <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755-.165.165-.337.328-.517.486l.708.709z" />
                  <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                  <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884-12-12 .708-.708 12 12-.708.708z" />
                </svg>
                )}
              </div>
              <button className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300" type="sumbit">Login</button>
            </form>
          </div>
          <div className="md:block hidden w-1/2">
            <img className="rounded-2xl" src="images/loginImg.jpg" />
          </div>
        </div>

      </section>

    </div>
  );
}

export default login;
