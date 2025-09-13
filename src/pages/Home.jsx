import React, { useState } from 'react'
import { deleteAPI, getEmployeeAPI } from '../services/allAPI'
import { Link } from 'react-router-dom';
import Edit from './Edit';

function Home() {
  const [employees,setEmployees]=useState([])

  React.useEffect(() => {
     getEmployee()
   }, []);
   const getEmployee= async () => {
     try {
       const result = await getEmployeeAPI();
       setEmployees(result);
        console.log(employees);
     } catch (err) {
       console.log(err);
     }

   };
  //  console.log(employees);

    const handleDelete = async (id) => {
    try {
setEmployees(employees.filter(emp => emp.id !== id));
      await deleteAPI(id);
     getEmployee();
      alert("Data deleted");
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <div>
      <div className="text-center">
        <h1 className='text-center text-blue-300 text-3xl mt-5 '>Employee List</h1>
             <table className="table-auto w-full my-5 rounded shadow py-5">
          <thead>
            <tr>
        <th>Id</th>
       <th>Name</th>
        <th>Email</th>
        <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {
          employees?.map((item)=>(
            
            <tr className='text-center  border-slate-500 shadow '>
        <td >{item.id}</td>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.status}</td>
        <td><Edit id={item.id} setEmployees={setEmployees} employees={employees}/></td>
        <td>
          <button style={{cursor:'pointer'}} onClick={() => {handleDelete(item.id);
                            }}  className='bg-red-500 px-2 my-2
                            text-white'>Delete</button>
        </td>
            </tr>
          ))
          }
          </tbody>
        </table>
<Link to={'/form'} className='rounded p-2 bg-blue-500 my-4 text-white inline-block'>ADD NEW EMPLOYEE</Link>
      </div>
    </div>
  )
}

export default Home
