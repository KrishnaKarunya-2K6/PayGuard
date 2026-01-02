import React from 'react';
import './Table.css';

const Table = ({ columns, data, emptyMessage = 'No data available' }) => {
    if (!data || data.length === 0) {
        return <div className="table-empty">{emptyMessage}</div>;
    }

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                    <tr>
                        {columns.map((col, index) => (
                            <th key={index} className={`table-header ${col.align ? `text-${col.align}` : ''}`}>
                                {col.header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={row.id || rowIndex} className="table-row">
                            {columns.map((col, colIndex) => (
                                <td key={colIndex} className={`table-cell ${col.align ? `text-${col.align}` : ''}`}>
                                    {col.render ? col.render(row) : row[col.accessor]}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Table;
