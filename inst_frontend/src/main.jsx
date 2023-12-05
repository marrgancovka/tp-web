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
import PageMyProfile from './Pages/Profile/MyProfile';
import { createBrowserRouter, RouterProvider, createHashRouter, Router } from 'react-router-dom'
import PageNewMoment from './Pages/NewMoment/NewMoment';


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
    path: '/profile/:pk',
    element: <PageProfile />
  },
  {
    path: '/profile/',
    element: <PageMyProfile />
  },
  {
    path: '/actions',
    element: <PageAction/>
  },
  {
    path: '/search',
    element: <PageSearch/>
  },
  {
    path: '/new_moment',
    element: <PageNewMoment/>
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <RouterProvider router={router} />
  // {/* </React.StrictMode>, */}
)


// import React from 'react';
// import ReactDOM from 'react-dom/client';
// import './index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { HashRouter, Routes, Route } from 'react-router-dom';
// import PageReg from './Pages/Register/Register';
// import PageLogin from './Pages/Login/Login';
// import PageFeed from './Pages/Feed/Feed';
// import PageProfile from './Pages/Profile/Profile';
// import PageAction from './Pages/Action/Action';
// import PageSearch from './Pages/Search/Search';
// import PageNewMoment from './Pages/NewMoment/NewMoment';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <HashRouter>
//     <Routes>
//       <Route path="/register" element={<PageReg />} />
//       <Route path="/login" element={<PageLogin />} />
//       <Route path="/feed" element={<PageFeed />} />
//       <Route path="/profile/:pk" element={<PageProfile />} />
//       <Route path="/actions" element={<PageAction />} />
//       <Route path="/search" element={<PageSearch />} />
//       <Route path="/new_moment" element={<PageNewMoment />} />
//     </Routes>
//   </HashRouter>
// );
