import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import ActiveUsersDashboard from './components/ActiveUsersDashboard/ActiveUsersDashboard';
import CreateUser from './components/auth/CreateUser';
import Login from './components/auth/Login';
import RootLayout from './components/layout/RootLayout';

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
                {
                    path: 'users',
                    children: [
                        {
                            path: 'active',
                            element: <ActiveUsersDashboard />,
                        },
                        {
                            path: 'inactive',
                            element: <p>Incative users</p>,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
