
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Pagination from './Pagination';
import Filter from './Filter'

function Table() {
  const [values, setUser] = useState([]);   
  const [currentPage, setCurrentpage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [filteredTextValue, setFilterTextValue] = useState('all')
  const options =['all' , 'blocked', 'unblock']


 
  

  const lastPostIndex = currentPage * postPerPage
  const  firstPostIndex = lastPostIndex - postPerPage
  const currentPost = values.slice(firstPostIndex,lastPostIndex)

  let filterdValue = currentPost.filter((user) =>{
    if(filteredTextValue === 'blocked'){
    return  user.status === true
    }else if( filteredTextValue ===  'unblock'){  
      return  user.status  === false
    }else{
      return user
    }
    
  })
  useEffect(() => {
    getallusers();
  }, []);

  function getallusers() {
    axios.get('/api/admin/allusers')
      .then((response) => {
        setUser(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }
 
  const controlUserState =(async(e, userId) => {
   const status = e.target.checked
   const res = await axios.put(`api/admin/status?userId=${userId}&status=${status}`);
  })

  const filterHandle=(filterValue) => {
    setFilterTextValue(filterValue)
  }


  return (
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
        <div className="overflow-hidden">
          <Filter filterHandle={filterHandle} options={options}/>
          <table className="min-w-full  relative">
            <thead className="border-b">
              <tr>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  No
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Name
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Email
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {
               filterdValue.map((element,i ) => (
                 <tr className="border-b">
               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{  firstPostIndex +i+1 }</td>
               
                   <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     {element.username}
                   </td>
                   <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     {element.email}
                   </td>
                   <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     <label className="inline-flex relative items-center mr-5 cursor-pointer">
                      {element.status ? 
                       <input type="checkbox" value="" className="sr-only peer"  onChange={(e) => controlUserState(e,element._id)} checked/>:
                       <input type="checkbox" value="" className="sr-only peer"  onChange={(e) => controlUserState(e,element._id)} />
                      }
                      <div className="w-11 h-6  bg-green-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
                     </label>
                   </td>
                 </tr>
               ))
              }
              <div className='p-2 '>
             <Pagination  totalPost = {values.length} postPerPage={postPerPage} setCurrentpage={setCurrentpage}  currentPage={currentPage}/>
              </div>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default Table;
