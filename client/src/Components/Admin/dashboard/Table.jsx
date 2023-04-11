
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Testing() {
  const [values, setUser] = useState([]);
  function getallusers() {
    axios.get('/api/admin/users')
      .then((response) => {
        console.log('response');
        console.log(response.data);
        setUser(response.data);
      }).catch((error) => {
        console.log(error);
      });
  }
  useEffect(() => {
    getallusers();
  }, []);
  return (
    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8 ">
      <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8 ">
        <div className="overflow-hidden">
          <table className="min-w-full  relative">
            <thead className="border-b">
              <tr>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  #
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Name
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Email
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Field
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Status
                </th>
                <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                  Options
                </th>
              </tr>
            </thead>
            <tbody>
              {
               values.map((element, i) => (

                 <tr className="border-b">
                   <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{i + 1}</td>
                   <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     {element.username}
                   </td>
                   <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     {element.email}
                   </td>
                   <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     {element.field}

                   </td>
                   <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap" />
                   <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                     <label className="inline-flex relative items-center mr-5 cursor-pointer">
                       <input type="checkbox" value="" className="sr-only peer" />
                       <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600" />
                       <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">block/unblock</span>
                     </label>
                   </td>
                 </tr>
               ))
              }

            </tbody>
          </table>

        </div>
      </div>
    </div>
  );
}

export default Testing;
