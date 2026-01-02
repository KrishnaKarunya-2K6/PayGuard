import React from 'react';
import './Badge.css';

const Badge = ({ status, children }) => {
    // Normalize status to lowercase for class mapping
    const normalizedStatus = status ? status.toLowerCase().replace(/ /g, '-') : 'neutral';

    // Map specific statuses to visual variants
    const getVariant = (st) => {
        switch (st) {
            case 'approved':
            case 'paid':
                return 'success';
            case 'needs-approval':
            case 'pending':
                return 'warning';
            case 'rejected':
            case 'failed':
                return 'danger';
            default:
                return 'neutral';
        }
    };

    const variant = getVariant(normalizedStatus);

    return (
        <span className={`badge badge-${variant}`}>
            {children || status}
        </span>
    );
};

export default Badge;
