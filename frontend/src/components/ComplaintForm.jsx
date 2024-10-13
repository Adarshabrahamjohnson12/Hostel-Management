import React, { useState } from 'react';

const ComplaintForm = () => {
  const [complaint, setComplaint] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Complaint submitted:', complaint);
    setComplaint('');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-lg font-semibold text-gray-600 mb-4">Submit a Complaint</h2>
      <form onSubmit={handleSubmit}>
        <textarea
          value={complaint}
          onChange={(e) => setComplaint(e.target.value)}
          placeholder="Describe your issue"
          className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ComplaintForm;
