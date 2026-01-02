import React from 'react';
import Navbar from './Navbar';
import './Layout.css';
import { Outlet } from 'react-router-dom';

const Layout = () => {
    return (
        <div className="layout">
            <Navbar />
            <main className="main-content">
                <div className="content-container">
                    <Outlet />
                </div>
            </main>
            <footer className="demo-disclaimer">
                <p>ℹ️ <strong>Demo Mode:</strong> This view is simulated using a frontend role switcher. In production, access is controlled via secure authentication.</p>
            </footer>
        </div>
    );
};

export default Layout;
