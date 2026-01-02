import React, { useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useRole, ROLES } from '../context/RoleContext';
import './Navbar.css';

const Navbar = () => {
    const { role, setRole } = useRole();
    const navigate = useNavigate();
    const location = useLocation();

    const handleRoleChange = (e) => {
        const newRole = e.target.value;
        setRole(newRole);

        // Redirect to default page for the new role
        if (newRole === ROLES.VENDOR) navigate('/upload');
        else if (newRole === ROLES.COMPANY) navigate('/dashboard');
        else if (newRole === ROLES.ADMIN) navigate('/admin');
    };

    // Route Protection: Redirect if unauthorized
    useEffect(() => {
        if (role === ROLES.VENDOR && location.pathname !== '/upload') {
            navigate('/upload');
        } else if (role === ROLES.COMPANY && location.pathname !== '/dashboard') {
            navigate('/dashboard');
        } else if (role === ROLES.ADMIN && location.pathname !== '/admin') {
            navigate('/admin');
        }
    }, [role, location.pathname, navigate]);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-brand">
                    <span className="brand-logo">⚡</span>
                    PayGuard
                </div>

                <div className="navbar-links">
                    {role === ROLES.COMPANY && (
                        <NavLink to="/dashboard" className="nav-link">
                            Company Dashboard
                        </NavLink>
                    )}

                    {role === ROLES.VENDOR && (
                        <NavLink to="/upload" className="nav-link">
                            Submit Invoice
                        </NavLink>
                    )}

                    {role === ROLES.ADMIN && (
                        <NavLink to="/admin" className="nav-link">
                            Admin Approval
                        </NavLink>
                    )}
                </div>

                <div className="role-switcher">
                    <label htmlFor="role-select">View as:</label>
                    <select
                        id="role-select"
                        value={role}
                        onChange={handleRoleChange}
                        className="role-select"
                    >
                        <option value={ROLES.VENDOR}>Vendor</option>
                        <option value={ROLES.COMPANY}>Company</option>
                        <option value={ROLES.ADMIN}>Admin</option>
                    </select>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
