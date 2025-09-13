import axios from "axios"

const BASEURL = "https://employee-server-zzu4.onrender.com"

const commonAPI =async (httpMethod,url,reqBody)=>{
   
    const reqConfig={
        method:httpMethod,
        url,
        data:reqBody
    }
   
    //api call- axios(reqConfig)- to create instance of axios
    return await axios(reqConfig).then(res=>{
        return res.data
    }).catch(err=>{
        return err
    })
       
}

// CREATE
  export  const addEmployeeAPI= async(employee)=>{
       return await commonAPI("POST",`${BASEURL}/employee`,employee)
    }

    // READ 
    export const getEmployeeAPI=async()=>{
        return await commonAPI("GET",`${BASEURL}/employee`,{})
    }
    // UPDATE 
    export const editAPI=async(id,employee)=>{
        return await commonAPI("PUT",`${BASEURL}/employee/${id}`,employee)
    }
    // DELETE 
    
    export const deleteAPI=async(id)=>{
        return await commonAPI("DELETE",`${BASEURL}/employee/${id}`,{})
    }