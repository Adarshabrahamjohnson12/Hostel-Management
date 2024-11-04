import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import axios from 'axios'; // Import axios
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const ComplaintForm = ({ Hno, userType, username }) => { // Accept userType and username as props
  const [complaint, setComplaint] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate(); // Initialize navigate

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    try {
      const response = await axios.post('http://localhost:5080/newcomplaint', {
        Hno,
        complaint
      });

      // Check for a message in the response and handle it accordingly
      if (response.data.message) {
        enqueueSnackbar(response.data.message, { variant: 'success' });
      }
   
    } catch (error) {
      console.error('Error submitting complaint:', error);
      enqueueSnackbar('An error occurred, please try again.', { variant: 'error' });
    }
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
          required // Make textarea required
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