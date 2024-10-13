import React, { useState } from 'react'
// const [login,setLogIn] = useState(true);

const AdminDash = ({ login }) => {
  const date = new Date();
  const showTime = date.getHours()
    + ':' + date.getMinutes();



  const MenuDetails = {
    1: { id: 'Home', },
    2: { id: 'Register students', },
    3: { id: 'Attendence', },
    4: { id: 'Mes', },
    5: { id: 'Invoice', },

  }

  const data = {
    id: 1,
    name: "Arun V K",
    email: "arunvk@gmail.com",
    phone: "1234567890",
    image: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png'
  }

  return (
    <div className='h-screen w-full flex'>

      <div className='bg-[#CD5C08] text-[#FFF5E4] w-[18%] h-screen pt-8 p-4'>
        <h1 className='font-semibold text-xl'>Admin Dashboard</h1>

        <ul className='grid mt-20 gap-3'>
          {Object.values(MenuDetails).map((Menuprop) => (
            <li key={Menuprop.id} className='p-2 text-[black] font-medium rounded bg-[#C1D8C3]'>
              <a href="/">{Menuprop.id}</a>
            </li>
          ))}
        </ul>




      </div>

      <div className='bg-[#FFF5E4] text-[black] w-[92%] h-screen p-8'>
        <div className='bg-[#C1D8C3] h-16 w-full flex flex-wrap gap-3 justify-between content-center px-4 rounded'>
          <p>{showTime}</p>
          <h2>{data.name}</h2>
          <span className='flex gap-3'>
            <img src={data.image} className='rounded-full bg-orange-500 h-6' alt="" />
            <a href="/">logout</a>
          </span>
        </div>

        <div className='bg-[#C1D8C3] h-[80%] p-4 mt-10 rounded'>

           <ul className='flex justify-between px-20 pt-4 gap-2'>
            <li className='bg-[#CD5C08] w-24 h-24 rounded'></li>
            <li className='bg-[#CD5C08] w-24 h-24 rounded'></li>
            <li className='bg-[#CD5C08] w-24 h-24 rounded'></li>
            <li className='bg-[#CD5C08] w-24 h-24 rounded'></li>
            <li className='bg-[#CD5C08] w-24 h-24 rounded'></li>
           </ul>
        </div>
        uuu
      </div>
    </div>
  )
}

export default AdminDash