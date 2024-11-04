import axios from 'axios';
import React, { useEffect, useState } from 'react';

const PaymentHistory = ({Hno}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:5080/payment')
        setData(response.data.data || []);
      }
      catch (error) {
        console.error('Error fetching user details:', error);
      }
    };
    fetchData();
  }, [])

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
          {data.map((prop, index) => (

          (prop[0] == Hno) ? (<tr key={index}>

              <td className="py-2">{prop[1]}</td>
              <td className="py-2">{prop[2]}/-</td>
              <td className="py-2">{prop[3] ? "Paid" : "pending"}</td>
            </tr>):(" ")

          ))}
          {/*<tr>
            <td className="py-2">2024-01-15</td>
            <td className="py-2">$500</td>
            <td className="py-2">Paid</td>
          </tr>
          <tr>
            <td className="py-2">2024-02-15</td>
            <td className="py-2">$500</td>
            <td className="py-2">Paid</td>
          </tr>*/}
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;
