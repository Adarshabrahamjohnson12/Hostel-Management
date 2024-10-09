import axios from 'axios';
import React, { useEffect, useState } from 'react';
import AdminDash from './pages/AdminDash';

const App = () => {
  const [Data,setData] = useState({});

  // random login in
  // setData({
  //   1 : {

  //   }
  // });
 
  // useEffect(()=>{
  //   // axios

  // },[])
  
  return (
    <div className='w-full h-full '>

    
    <AdminDash />

    </div>
  )
}

export default App