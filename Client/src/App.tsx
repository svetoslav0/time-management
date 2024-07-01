import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthContextProvider } from './components/auth/AuthContext';
import CreateUser from './components/auth/CreateUser';
import Login from './components/auth/Login';
import { restrictIsLogin } from './components/guards/guards';
import RootLayout from './components/layout/RootLayout';
import ProjectAdminDashboard from './components/project/ProjectAdminDashboard';
import ProjectDetails from './components/project/ProjectDetails';
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
                    loader: restrictIsLogin,
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
                        {
                            path: 'projectForm',
                            element: <ProjectFormControl />,
                        },
                        {
                            path: 'createUser',
                            element: <CreateUser />,
                        },
                        {
                            path: 'users',
                            element: <UsersDashboard />,
                        },
                        {
                            path: 'users/:id',
                            element: <UserPage />,
                        },
                        {
                            path: 'projects',
                            element: <ProjectAdminDashboard />,
                        },
                        {
                            path: 'projects/:id',
                            element: <ProjectDetails />,
                        },
                    ],
                },
            ],
        },
    ]);

    return (
        <AuthContextProvider>
            <RouterProvider router={router} />
        </AuthContextProvider>
    );
}

export default App;
