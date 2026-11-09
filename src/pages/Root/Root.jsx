import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from '../../components/Shared/Header/Navbar';
import Footer from '../../components/Shared/Footer/Footer';

const Root = () => {
    const { pathname, hash } = useLocation();

    useEffect(() => {
        if (!hash) {
            return;
        }

        const targetId = decodeURIComponent(hash.slice(1));
        let frameId;
        let timeoutId;

        const scrollToTarget = () => {
            const target = document.getElementById(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start',
                });
            }
        };

        frameId = window.requestAnimationFrame(() => {
            timeoutId = window.setTimeout(scrollToTarget, 80);
        });

        return () => {
            window.cancelAnimationFrame(frameId);
            window.clearTimeout(timeoutId);
        };
    }, [pathname, hash]);

    return (
         <div className='max-w-7xl mx-auto'>
            <Navbar></Navbar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Root;
