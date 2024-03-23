import React from "react"
import Root from "./routes/Root";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Home from './pages/Home/components/Home';
import Products from "./pages/Products/component/Products";
import Cart from "./pages/Cart/components/Cart";
import NotFound from './pages/NotFound'
import SignUp from './pages/SignUp/components/SignUp';
import SignIn from './pages/SignIn/components/SignIn';
import Forget from './pages/forgetPassword/components/Forget';

import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoutes from "./auth/ProtectedRoutes";
import UserContextProvider from './context/User';
import CategoryProducts from './pages/categories/CategoryProducts';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },   
      {
        path: "/Products",
        element:
        <ProtectedRoutes>
        <Products/>
        </ProtectedRoutes>
        ,
      },
      {
        path:'/categories/:id',
        element:<CategoryProducts/>
      } ,
      {
        path: "/Cart",
        element:
        <ProtectedRoutes>
        <Cart/>
        </ProtectedRoutes>
        ,
      },
      {
        path: "/signin",
        element: <SignIn/>,
      }, 
      {
        path: "/signup",
        element: <SignUp/>,
      },  
      {
        path: "/forget",
        element: <Forget/>,
      },
      {path: "*",
      element: <NotFound/>,
      },
    ]
  },
 
]);


export default function App() {
  
  return (
    <>
          <UserContextProvider>
          <RouterProvider router={router} />
          </UserContextProvider> 
          
          <ToastContainer />
    </>
  )
}
