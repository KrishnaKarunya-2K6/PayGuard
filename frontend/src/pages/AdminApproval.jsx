import React, { useState, useEffect } from 'react';
import { invoiceService } from '../services/invoiceService';
import Card from '../components/Card';
import Table from '../components/Table';
import Button from '../components/Button';
import Badge from '../components/Badge';
import './AdminApproval.css';

const AdminApproval = () => {
    const [invoices, setInvoices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [processingId, setProcessingId] = useState(null);

    const fetchInvoices = async () => {
        setLoading(true);
        const data = await invoiceService.getInvoices();
        // Filter filter is applied on client side for this demo
        setInvoices(data.filter(inv => inv.status === 'Needs Approval'));
        setLoading(false);
    };

    useEffect(() => {
        fetchInvoices();
    }, []);

    const handleAction = async (id, status) => {
        setProcessingId(id);
        await invoiceService.updateStatus(id, status);
        await fetchInvoices(); // Refresh list to remove processed item
        setProcessingId(null);
    };

    const columns = [
        { header: 'Invoice ID', accessor: 'id' },
        { header: 'Vendor', accessor: 'vendor' },
        {
            header: 'Amount',
            accessor: 'amount',
            render: (row) => `$${row.amount.toFixed(2)}`,
            align: 'right'
        },
        {
            header: 'Status',
            accessor: 'status',
            render: (row) => <Badge status={row.status} />
        },
        {
            header: 'Actions',
            accessor: 'actions',
            align: 'center',
            render: (row) => (
                <div className="action-buttons">
                    <Button
                        size="sm"
                        variant="success"
                        onClick={() => handleAction(row.id, 'Approved')}
                        disabled={processingId === row.id}
                    >
                        Approve
                    </Button>
                    <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleAction(row.id, 'Rejected')} // Assuming 'Rejected' is a valid status we want to show
                        disabled={processingId === row.id}
                    >
                        Reject
                    </Button>
                </div>
            )
        }
    ];

    return (
        <div className="admin-page">
            <div className="admin-header">
                <h1>PayGuard Admin Approval</h1>
                <p>Review high-value invoices requiring manual authorization.</p>
            </div>

            <Card>
                {loading ? (
                    <div className="loading">Loading filtered invoices...</div>
                ) : (
                    <Table
                        columns={columns}
                        data={invoices}
                        emptyMessage="No invoices pending approval."
                    />
                )}
            </Card>
        </div>
    );
};

export default AdminApproval;
