import React, { useState, useEffect } from 'react';
import { invoiceService } from '../services/invoiceService';
import Card from '../components/Card';
import Input from '../components/Input';
import Button from '../components/Button';
import './VendorUpload.css';

const VendorUpload = () => {
    const [formData, setFormData] = useState({
        id: '',
        vendorId: '',
        vendor: '',
        amount: '',
        description: ''
    });
    const [file, setFile] = useState(null);
    const [submitting, setSubmitting] = useState(false);
    const [successMsg, setSuccessMsg] = useState('');
    const [registeredVendors, setRegisteredVendors] = useState([]);
    const [isKnownVendor, setIsKnownVendor] = useState(false);

    useEffect(() => {
        // Load registered vendors for auto-fill/validation
        invoiceService.getRegisteredVendors().then(setRegisteredVendors);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Auto-fill logic for Vendor ID
        if (name === 'vendorId') {
            const match = registeredVendors.find(v => v.id === value);
            if (match) {
                setFormData(prev => ({ ...prev, [name]: value, vendor: match.name }));
                setIsKnownVendor(true);
            } else {
                setFormData(prev => ({ ...prev, [name]: value, vendor: '' })); // Reset name if ID changes to unknown
                setIsKnownVendor(false);
            }
        } else if (name === 'vendor') {
            // If user manually edits vendor name, it might be an unregistered vendor
            setFormData(prev => ({ ...prev, [name]: value }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setSuccessMsg('');

        const payload = {
            id: formData.id,
            vendorId: formData.vendorId, // Now including ID
            vendor: formData.vendor,
            amount: parseFloat(formData.amount),
            description: formData.description,
        };

        await invoiceService.addInvoice(payload);

        setSubmitting(false);
        setSuccessMsg('Invoice submitted for verification');
        setFormData({ id: '', vendorId: '', vendor: '', amount: '', description: '' });
        setFile(null);
        setIsKnownVendor(false);
    };

    return (
        <div className="upload-page">
            <div className="upload-header">
                <h1>PayGuard – Submit Invoice</h1>
                <p>Upload your invoice details for payment processing.</p>
            </div>

            <div className="upload-container">
                <Card>
                    {successMsg && (
                        <div className="success-banner">
                            {successMsg}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="upload-form">
                        <Input
                            label="Tax Invoice ID"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            placeholder="e.g. INV-2024-001"
                            required
                            fullWidth
                        />

                        <div className="vendor-group">
                            <Input
                                label="Vendor ID"
                                name="vendorId"
                                value={formData.vendorId}
                                onChange={handleChange}
                                placeholder="e.g. V-1001"
                                required
                                fullWidth
                                className="vendor-id-input"
                            />
                            <div className="vendor-status">
                                {formData.vendorId && (
                                    isKnownVendor
                                        ? <span className="text-success">✓ Verified Vendor</span>
                                        : <span className="text-warning">⚠ Unrecognized Vendor</span>
                                )}
                            </div>
                        </div>

                        <Input
                            label="Vendor Name"
                            name="vendor"
                            value={formData.vendor}
                            onChange={handleChange}
                            placeholder="Company Name"
                            required
                            fullWidth
                            disabled={isKnownVendor} // Lock if auto-filled
                        />

                        <Input
                            label="Amount ($)"
                            name="amount"
                            type="number"
                            value={formData.amount}
                            onChange={handleChange}
                            placeholder="0.00"
                            required
                            min="0"
                            step="0.01"
                            fullWidth
                        />

                        <Input
                            label="Description"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Services rendered..."
                            required
                            fullWidth
                        />

                        <div className="file-upload-group">
                            <label className="file-label">Invoice PDF</label>
                            <input
                                type="file"
                                accept=".pdf"
                                onChange={handleFileChange}
                                className="file-input"
                            />
                            <p className="file-hint">Upload the invoice document (PDF only).</p>
                        </div>

                        <div className="form-actions">
                            <Button
                                type="submit"
                                disabled={submitting}
                                className="submit-btn"
                                fullWidth
                            >
                                {submitting ? 'Submitting...' : 'Submit Invoice'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default VendorUpload;
