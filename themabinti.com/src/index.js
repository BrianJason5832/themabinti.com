import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import Login from './Pages/login';
import Emailverification from './Pages/Emailverification';
import Signup from './Pages/signup';
import Myaccount from './Pages/myaccount';
import {Provider} from "react-redux";
import store from './store';
import PostService from './Pages/postservice';
import ProtectedRoute from './components/protectedroute';
import { createBrowserRouter, RouterProvider, Navigate} from 'react-router-dom';
import Aboutus from './Pages/aboutus';
import SearchResults from './components/searchresults';
import ContactUs from './Pages/contactus';
import Blogs from './components/blogs';
import BlogDetail from './components/blogdetail';
import PostBlog from './components/postblog';
import LocationServicesPage from './components/LocationServicesPage';
import SubcategoryServicesPage from './components/SubcategoryServicesPage';
import ChoosePackage from './Pages/ChoosePackage'
import TypeSelect from './Pages/TypeSelect';
import PostYourService from './Pages/PostYourService';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
  },
  {
    path: '/Login',
    element: <Login/>,
  },
  {
    path: "/Emailverification",
    element: <Emailverification/>,
  },
  {
    path: "/search",
    element: <SearchResults/>,
  },
  {
    path: "/Signup",
    element: <Signup/>,
  },
  {
    path: "/ContactUs",
    element: <ContactUs />,
  },
  {
    path: "/Aboutus", // Added leading slash
    element: <Aboutus />,
  },
  {
    path: "/blogs",
    element: <Blogs/>,
  },
  {
    path: "/blogs/:id",
    element: <BlogDetail />,
  },
  {
    path: "/postblog",
    element: <PostBlog />,
  },
  {
    path: '/services/location/:location',
    element: <LocationServicesPage />, 
  },
  {
    path: '/services/:category/:subcategory',
    element: <SubcategoryServicesPage />,
  },
  {
    path: '/ChoosePackage', 
    element: <ChoosePackage />,
  },
  {
    path: '/TypeSelect', 
    element: <TypeSelect/>,
  },
  {
    path: '/PostYourService', 
    element: <PostYourService/>,
  },
  {
    element: <ProtectedRoute />,
    children: [
      {
        path: "/Myaccount",
        element: <Myaccount />,
      },
      {
        path: "/PostService",
        element: <PostService />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
    <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
