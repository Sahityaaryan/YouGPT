import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import SignIn from './components/SignIn.jsx'
import Register from './components/Register.jsx'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>
  },
  {
    path: '/user/api/signin',
    element:(
      <SignIn/>
    )
  },
  {
    path: '/user/api/register',
    element:(
      <Register/>
    )
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
       < RouterProvider  router={router}/>
)
