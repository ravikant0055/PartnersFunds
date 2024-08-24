
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/layout';
import Newpage from './components/builder/Newpage';
import Main from './components/Main';
import ErrorPage from './components/builder/ErrorPage';
import { Provider } from 'react-redux';
import store from './store/store';
import SubmitPage from './components/SubmitPage';
import Loading from './components/builder/Loading';
import Nodatapage from './components/builder/Nodatapage';
//import MultiSelect from './components/fields/MultiSelect';
import { PrimeReactProvider } from 'primereact/api';
import { MultiSelect } from 'primereact/multiselect';
import { useState } from 'react';

function App() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout/>,
      errorElement:<ErrorPage/>,
      children: [
        {
          path: "/",
          element: <Main/>,
        },
        {
          path: "/page/:pageId",
          element: <Newpage/>,
        },
        {
          path: "/submitPage",
          element: <SubmitPage/>,
        },
        {
          path: "/loading",
          element: <Loading/>,
        },
        {
          path: "/nopage",
          element: <Nodatapage/>,
        }
      ],
    },
  ]);

  return (
    <>
     <Provider store={store}>
      <RouterProvider router={router}>
          <Layout/>
      </RouterProvider>
     </Provider> 
    </>
  );
}

export default App;
