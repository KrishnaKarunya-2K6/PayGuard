import React, { createContext, useState, useContext } from 'react';

const RoleContext = createContext();

export const ROLES = {
    VENDOR: 'Vendor',
    COMPANY: 'Company',
    ADMIN: 'Admin'
};

export const RoleProvider = ({ children }) => {
    const [role, setRole] = useState(ROLES.COMPANY); // Default role

    return (
        <RoleContext.Provider value={{ role, setRole }}>
            {children}
        </RoleContext.Provider>
    );
};

export const useRole = () => useContext(RoleContext);
