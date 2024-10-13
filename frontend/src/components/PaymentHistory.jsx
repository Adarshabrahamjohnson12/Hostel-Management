import React from 'react';

const PaymentHistory = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Payment History</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2">Date</th>
            <th className="py-2">Amount</th>
            <th className="py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="py-2">2024-01-15</td>
            <td className="py-2">$500</td>
            <td className="py-2">Paid</td>
          </tr>
          <tr>
            <td className="py-2">2024-02-15</td>
            <td className="py-2">$500</td>
            <td className="py-2">Paid</td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
