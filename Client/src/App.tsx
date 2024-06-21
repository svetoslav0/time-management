import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import CreateUser from './components/auth/CreateUser';
import Login from './components/auth/Login';
import RootLayout from './components/layout/RootLayout';
import ProjectAdminDashboard from './components/project/ProjectAdminDashboard';
import ProjectFormControl from './components/projectForm/ProjectFormControl';
import UserPage from './components/UserPage/UserPage';
import UsersDashboard from './components/UsersDashboard/UsersDashboard';

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
                    ],
                },
                {
                    path: 'admin',
                    children: [
                        { path: 'projectForm', element: <ProjectFormControl /> },
                        {
                            path: 'createUser',
                            element: <CreateUser />,
                        },
                        {
                            path: 'projectAdminDashboard',
                            element: <ProjectAdminDashboard />,
                        },
                    ],
                },
                {
                    path: 'dashboard',
                    children: [
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
