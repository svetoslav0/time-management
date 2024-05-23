import { useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Navigation } from './Navigation';

export default function RootLayout() {
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'dark';
    });

    function handleDarkMode() {
        setDarkMode((prevMode) => !prevMode);
        localStorage.setItem('theme', darkMode ? 'light' : 'dark');
    }

    return (
        <div className={`flex min-h-screen flex-col ${darkMode ? 'dark' : ''}`}>
            <Navigation onChangeDarkMode={handleDarkMode} mode={darkMode} />
            <main className='flex-grow'>
                <Outlet />
            </main>
            <footer className='m-auto h-10 w-3/4 text-center'>footer</footer>
        </div>
    );
}
