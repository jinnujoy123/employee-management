import React, { useState } from 'react'
import { addEmployeeAPI } from '../services/allAPI'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

function Form() {
    const [employee,setEmployee]=useState({
      
        name:"",
        email:"",
        status:""

    })
    const navigate = useNavigate();
    const [employees,setEmployees]=useState([])
    const addEmployee=async()=>{
        if(employee.name && employee.email && employee.status){
        await addEmployeeAPI(employee)
        setEmployees([...employees,employee])
        console.log(employee);
         setEmployee({
         
          name: "",
          email: "",
          status: ""
        });

        // only redirect after success
        navigate('/');
        
    }
    else{
        alert("Please fill all fields")
    }
}
  return (
    <>
      <div className="  text-center my-5">
            <h1 className='text-3xl text-blue-300 py-5'>Employee Details</h1>
            <div className="flex text-center flex-col justify-center items-center mt-5">
               
                <input onChange={(e)=>setEmployee({...employee,name:e.target.value})} value={employee.name}  type="text" className='border rounded p-2' placeholder='Name'/> <br />
                <input onChange={(e)=>setEmployee({...employee,email:e.target.value})} value={employee.email} type="text" className='border rounded p-2' placeholder='Email'/><br />
                <select value={employee.status} onChange={(e)=>setEmployee({...employee,status:e.target.value})}  name="" id="" className='border'>
                    <option value="">Status</option>
                      <option value="active">Active</option>
                       <option value="inactive">Inactive</option>
                </select>
                <button className='text-center border rounded p-2 my-5 bg-blue-500 rounded text-white p-2 my-2'>
                    <Link  onClick={addEmployee}>Submit</Link>
                </button>
            </div>
      </div>
    </>
  )
}

export default Form

