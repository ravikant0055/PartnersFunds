
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Layout from './layout/layout';
import Newpage from './components/builder/Newpage';
import Main from './components/Main';
import ErrorPage from './components/builder/ErrorPage';


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
        }
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router}>
         <Layout/>
      </RouterProvider>
    </>
  );
}

export default App;
