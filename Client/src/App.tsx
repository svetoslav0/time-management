import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { AuthContextProvider } from './components/auth/AuthContext';
import CreateUser from './components/auth/CreateUser';
import GoogleCreateAcc from './components/auth/GoogleCreateAcc';
import Login from './components/auth/Login';
import CustomerProjectDetails from './components/dashboard/customerProjects/CustomerProjectDetails';
import Dashboard from './components/dashboard/Dashboard';
import {
    restrictAdminPages,
    restrictHomePage,
    restrictLoginPage,
} from './components/guards/guards';
import RootLayout from './components/layout/RootLayout';
import MyProfile from './components/myProfile/MyProfile';
import ProjectAdminDashboard from './components/project/ProjectAdminDashboard';
import ProjectDetails from './components/project/projectDetails/ProjectDetails';
import ProjectFormControl from './components/projectForm/ProjectFormControl';
import UserPage from './components/UserPage/UserPage';
import UsersDashboard from './components/UsersDashboard/UsersDashboard';
import Error from '@/components/error/Error';

function App() {
    const router = createBrowserRouter([
        {
            path: '/',
            element: (
                <AuthContextProvider>
                    <RootLayout />
                </AuthContextProvider>
            ),
            errorElement: <Error />,
            children: [
                {
                    index: true,
                    element: <h1>Home Page</h1>,
                    loader: restrictHomePage,
                },
                {
                    path: 'invite/:id',
                    element: <GoogleCreateAcc />,
                },
                {
                    path: 'auth',
                    children: [
                        {
                            path: 'login',
                            element: <Login />,
                            loader: restrictLoginPage,
                        },
                    ],
                },
                {
                    path: 'admin',
                    children: [
                        {
                            path: 'projectForm',
                            element: <ProjectFormControl />,
                            loader: restrictAdminPages,
                        },
                        {
                            path: 'createUser',
                            element: <CreateUser />,
                            loader: restrictAdminPages,
                        },

                        {
                            path: 'users',
                            element: <UsersDashboard />,
                            loader: restrictAdminPages,
                        },
                        {
                            path: 'users/:id',
                            element: <UserPage />,
                            loader: restrictAdminPages,
                        },
                        {
                            path: 'projects',
                            element: <ProjectAdminDashboard />,
                            loader: restrictAdminPages,
                        },
                        {
                            path: 'projects/:id',
                            element: <ProjectDetails />,
                            loader: restrictAdminPages,
                        },
                    ],
                },
                {
                    path: 'dashboard',
                    element: <Dashboard />,
                },
                {
                    path: 'dashboard/:id',
                    element: <CustomerProjectDetails />,
                },
                {
                    path: 'profile',
                    element: <MyProfile />
                }
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
