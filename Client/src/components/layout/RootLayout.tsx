import { Outlet } from 'react-router-dom';

export default function RootLayout() {
    return (
        <>
            <nav>Navigation</nav>
            <main>
                <Outlet />
            </main>
            <footer>footer</footer>
        </>
    );
}
