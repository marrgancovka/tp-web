import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import PageReg from './Pages/Register/Register';
import PageLogin from './Pages/Login/Login';
import PageFeed from './Pages/Feed/Feed';
import PageProfile from './Pages/Profile/Profile';
import PageAction from './Pages/Action/Action';
import PageSearch from './Pages/Search/Search';
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


const router = createBrowserRouter([
  {
    path: '/register',
    element: <PageReg/>
  },
  {
    path: '/login',
    element: <PageLogin/>
  },
  {
    path: '/feed',
    element: <PageFeed/>
  },
  {
    path: '/profile',
    element: <PageProfile/>
  },
  {
    path: '/actions',
    element: <PageAction/>
  },
  {
    path: '/search',
    element: <PageSearch/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
