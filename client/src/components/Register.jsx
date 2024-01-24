

'use client'

import { useState } from 'react';
import { FaEye, FaEyeSlash } from "react-icons/fa6";
// import id from "../../utils/userIdGenerator.js"
// import bcrypt from 'bcrypt'
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function SignIn() {
  const [user, setUser] = useState({
    username:'',
    email: '',
    password: '',
  })
  const [showPassword, setShowPassword] = useState(false);

  async function register(user) {

    try {
      const res = await axios.post('/api/register', user, {
        headers: {
          "Content-Type": "application/json",
        }
      })

      const response = res.data;
      return response;

    } catch (e) {
      return e;
    }
  }


 async function SubmitHandler(e) {
    e.preventDefault();

    // hashing the password - not able to hash the password because vite says that these are not meant to be used in browser. link - (https://github.com/vitejs/vite/issues/11559)
    

    if(user)
    {
    register(user).then((response) => {
      

      if(response.success)
      {
        toast.success("Register Successfull");
        window.location.replace('/');
      } else {
        toast.error("Register Failed");
      }

    }).catch((error) => {
      console.log('error(register catch): ',error);
      toast.error(error.message);
    });
    }  else {
      console.log('user(denied): ',user);
      return;
    }

  }

 

  return (
    

      <div className='bg-[#2c2d33] h-screen'>


  

      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
         
          <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">
            Register for an account
          </p>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" onSubmit={SubmitHandler}>

          <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Username
              </label>
              <div className="mt-2">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  onChange={(e) => setUser({ ...user, ['username']: e.target.value })}
                  value={user.username}
                  className="block p-2 w-full rounded-md border-0 py-1.5  shadow-sm focus:outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-white">
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => setUser({ ...user, ['email']: e.target.value })}
                  value={user.email}
                  className="block p-2 w-full rounded-md border-0 py-1.5  shadow-sm focus:outline-none placeholder:text-gray-400 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-white">
                  Password
                </label>

              </div>
              <div className="mt-2 flex border ring-1 ring-inset ring-gray-300 border-white rounded-md bg-white focus:ring-inset focus:ring-2 focus:ring-indigo-600">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  onChange={(e) => setUser({ ...user, ['password']: e.target.value })}
                  value={user.password}
                  className="block w-full rounded-md border-0 p-2 shadow-sm placeholder:text-gray-400 focus:outline-none sm:text-sm sm:leading-6"
                >
                </input>
                <button onClick={() => { setShowPassword(!showPassword) }} className='p-2'>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>


            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Create account
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Already have an account?{' '}
            <a href="/user/api/signin" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              SignIn
            </a>
          </p>

        </div>
      </div>


      <ToastContainer
  position="top-center"
  autoClose={5000}
  hideProgressBar={false}
  newestOnTop={false}
  closeOnClick
  rtl={false}
  pauseOnFocusLoss
  draggable
  pauseOnHover
  theme="dark"
  />

    </div>
  )
}
