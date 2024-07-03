import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

import { Navigation } from './Navigation';

export default function RootLayout() {
    return (
        <div className={`flex min-h-screen flex-col`}>
            <Navigation />
            <main className='flex-grow'>
                <Toaster
                    position='top-center'
                    gutter={12}
                    containerStyle={{ margin: '30px' }}
                    toastOptions={{
                        success: {
                            duration: 3000,
                        },
                        error: {
                            duration: 5000,
                        },
                    }}
                />
                <Outlet />
            </main>
        </div>
    );
}
