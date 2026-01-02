import React from 'react';
import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className = '',
    disabled = false,
    ...props
}) => {
    return (
        <button
            className={`btn btn-${variant} btn-${size} ${className}`}
            disabled={disabled}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
