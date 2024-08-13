import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

import { Navigation } from './Navigation';

export default function RootLayout() {
    return (
        <>
            <Navigation />
            <div className='mx-auto flex min-h-screen max-w-screen-xl flex-col'>
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
        </>
    );
}
