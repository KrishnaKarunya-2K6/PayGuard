// Registered vendors for validation
export const validVendors = [
    { id: 'V-1001', name: 'Acme Corp' },
    { id: 'V-1002', name: 'TechSquid' },
    { id: 'V-1003', name: 'Global Services' },
    { id: 'V-1004', name: 'FastLogistics' },
    { id: 'V-1005', name: 'CleanWorks' }
];

export const initialInvoices = [
    {
        id: 'INV-001',
        vendorId: 'V-1001',
        vendor: 'Acme Corp',
        amount: 1500.00,
        status: 'Paid',
        description: 'Office Supplies - Q4',
        date: '2023-10-15'
    },
    {
        id: 'INV-002',
        vendorId: 'V-1002',
        vendor: 'TechSquid',
        amount: 5000.00,
        status: 'Approved',
        description: 'Server Maintenance',
        date: '2023-11-01'
    },
    {
        id: 'INV-003',
        vendorId: 'V-1003',
        vendor: 'Global Services',
        amount: 12000.00,
        status: 'Needs Approval',
        description: 'Consulting Fees',
        date: '2023-11-10'
    },
    {
        id: 'INV-004',
        vendorId: 'V-1004',
        vendor: 'FastLogistics',
        amount: 350.00,
        status: 'Needs Approval',
        description: 'Shipping Changes',
        date: '2023-11-12'
    },
    {
        id: 'INV-005',
        vendorId: 'V-1005',
        vendor: 'CleanWorks',
        amount: 800.00,
        status: 'Paid',
        description: 'Cleaning Services',
        date: '2023-10-20'
    }
];
