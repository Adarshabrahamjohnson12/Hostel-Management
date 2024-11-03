import { useSnackbar } from 'notistack';
import React, { useState } from 'react';

const ComplaintForm = ({Hno}) => {
  const [complaint, setComplaint] = useState('');
  const {enqueueSnackbar}= useSnackbar();
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from submitting normally

    try {
      const response = await axios.post('http://localhost:5080/newcomplaint', {
        Hno,
        content,
      });
      setMessage(response.data.message);
      setLogIn(response.data.login);
      enqueueSnackbar('Login successful', { variant: 'success' });

      // Navigate based on userType
      if (response.data.login) {
        if (userType === "student") {
          navigate(`/student/${username}`); // Navigate to StudentDashboard
        } else {
          navigate('/admin'); // Navigate to AdminDashboard
        }
      }
    } catch (error) {
      console.error('Error logging in:', error);
      setMessage('An error occurred');
      enqueueSnackbar('Try again ', { variant: 'error' });
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
