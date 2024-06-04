import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CreateUser from './components/auth/CreateUser';
import Login from './components/auth/Login';
import RootLayout from './components/layout/RootLayout';

import ProjectDashboard from './components/project/ProjectDashboard';

import UsersDashboard from './components/UsersDashboard/UsersDashboard';
import UserPage from './components/UserPage/UserPage';


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
                    path: 'dashboard',
                    children: [
                        {
                            path: 'projects',
                            element: <ProjectDashboard />,
                        },
                        {

                            path: 'users',
                            element: <UsersDashboard />,

                        },
                        {
                            path: 'users/:id',
                            element: <UserPage />,
                        },
                    ],
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
