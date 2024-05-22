import { RouterProvider, createBrowserRouter } from 'react-router-dom';
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
                    element: <h1>Login and register</h1>,
                },
            ],
        },
    ]);

    return <RouterProvider router={router} />;
}

export default App;
