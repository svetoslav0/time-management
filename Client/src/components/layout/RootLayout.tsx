import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';

import { Navigation } from './Navigation';

export default function RootLayout() {
    return (
        <>
            <div className='fixed left-0 right-0 top-0 z-50 w-full'>
                <Navigation />
            </div>
            <div className='mx-auto flex min-h-screen max-w-screen-xl flex-col mt-[98px]'>
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
