import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
    const params = useParams();
    const username = params.id;
    const [userData, setUserData] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:5080/userdetail', {
                    username,
                });

                if (response.data.login) {
                    setUserData({
                        fname: response.data.fname,
                        lname: response.data.lname,
                        Rno: response.data.Rno,
                        Hno: response.data.Hno,
                        email: response.data.e_mail,
                        image: response.data.image || 'https://png.pngtree.com/png-clipart/20230927/original/pngtree-man-avatar-image-for-profile-png-image_13001882.png', // Fallback image
                    });
                } else {
                    setError('User not found or not logged in.');
                }
            } catch (error) {
                console.error('Error fetching user details:', error);
                setError('An error occurred while fetching user details.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [username]);

    if (loading) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <span className='animate-ping bg-slate-600 w-60 h-60 rounded-full flex justify-center items-center text-3xl text-white'>
                    Loading...
                </span>
            </div>
        );
    }

    if (error) {
        return (
            <div className='flex justify-center items-center h-screen'>
                <span className='text-red-500'>{error}</span>
            </div>
        );
    }

    return (
        <div className='flex bg-gray-800 justify-center items-center h-screen'>
            
            <div className='bg-white shadow-lg rounded-lg p-6 max-w-md w-full'>
                <div className='flex flex-col items-center mb-4'>
                <a className='mb-8 font-bold' href={`/student/${username}`}>Home</a>
                    <img 
                        src={`"${userData.image}"`} 
                        alt={`${userData.fname} ${userData.lname}`} 
                        className='w-24 h-24 rounded-full border-2 border-gray-300 mb-4' 
                    />
                    <h1 className='text-2xl font-bold text-center'>Profile</h1>
                    <h2 className='text-xl font-semibold text-center'>
                        Username: <span className='text-gray-700'>{username}</span>
                    </h2>
                </div>
                <div className='border-t border-gray-300 mt-4 pt-4'>
                    <p className='text-lg'><strong>First Name:</strong> {userData.fname}</p>
                    <p className='text-lg'><strong>Last Name:</strong> {userData.lname}</p>
                    <p className='text-lg'><strong>Room Number:</strong> R{userData.Rno}</p>
                    <p className='text-lg'><strong>Hostel Number:</strong> H{userData.Hno}</p>
                    <p className='text-lg'><strong>Email:</strong> {userData.email}</p>
                </div>
            </div>
        </div>
    );
}

export default Profile;
