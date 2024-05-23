import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import RootLayout from './components/layout/RootLayout';
import Login from './components/auth/Login';
import CreateUser from './components/auth/CreateUser';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: <RootLayout />,
            errorElement: <h1>error</h1>,
            children: [
                {
                    index: true,
                    element: <h1>Home Page</h1>,
                },
                {
                    path: 'auth',
                    children: [
                        {
                            path: 'login',
                            element: <Login />,
                        },
                        {
                            path: 'create-user',
                            element: <CreateUser />,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
