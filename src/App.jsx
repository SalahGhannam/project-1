import React from "react"
import Root from "./routes/Root";
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Home from './pages/Home/components/Home';
import Categories from "./pages/Categories/components/Categories";
import Products from "./pages/Products/component/Products";
import Cart from "./pages/Cart/components/Cart";
import NotFound from './pages/NotFound';


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
        path: "/Categories",
        element: <Categories/>,
      }, 
      {
        path: "/Products",
        element: <Products/>,
      }, 
      {
        path: "/Cart",
        element: <Cart/>,
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
          <RouterProvider router={router} />

    </>
  )
}
