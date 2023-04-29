import React,{useEffect,useState} from 'react'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from '@chakra-ui/react'
import axios from 'axios'
import ViewReportModal from './ViewReportModal'
import ViewReportPost from './ViewReportPost'
import Pagination from './Pagination'
import Filter from './Filter'

function Report() {
const [report, setReport] = useState([])
const [currentPage, setCurrentPage] = useState(1)
const [postPerPage, setPostPerPage] = useState(10)
const [filteredTextValue,  setFilterTextValue] = useState('all')
const options=['all', 'hide', 'unhide']

  useEffect(() => {  
     fetchData()
  },[])
 
  
  const lastPostIndex =  currentPage * postPerPage
  const firstPostIndex = lastPostIndex - postPerPage
  const currentPost = report.slice(firstPostIndex, lastPostIndex)

  let filterdValue = currentPost.filter((report) =>{
    if(filteredTextValue === 'unhide'){
    return  report.response.status === false
    }else if( filteredTextValue ===  'hide'){  
      return  report.response.status 
    }else{
      return report
    }
    
  })

  const fetchData =async () => {
    const result = await axios.get('/api/admin/getreports')
    setReport(result.data)    
    }  

 const controlPost =async(e,postId) => {
  const status = e.target.checked
  const response = await axios.put(`/api/admin/conrtrolpost?postId=${postId}&status=${status}`) 
 }
 const filterHandle=(filterValue) => {
  setFilterTextValue(filterValue);
 }
  return (
    <>
      <Filter filterHandle={filterHandle} options={options} />
    <div className='pt-4'>
      <TableContainer>
  <Table variant='simple'>
    <Thead>
      <Tr>
      <Th>Sl.No</Th>
        <Th>Post Owner</Th>
        <Th>Report Count</Th>
        <Th>View Reason</Th>
        <Th>View Post</Th>
        <Th>Hide Post</Th>
      </Tr>
    </Thead>
    <Tbody>
      {filterdValue. map((data,i) => (
      <Tr>
        <Td>{firstPostIndex+i+1}</Td>
       
        <Td>{data.response.userId.username}</Td>
        <Td >{data.problem.length}</Td>
        <Td ><ViewReportModal problems={data.problem}/></Td>
        <Td ><ViewReportPost post={data.response.imageName[0]}/></Td>
        <Td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
          <label className="inline-flex relative items-center mr-5 cursor-pointer">
            {data.response.status ? 
            <input type="checkbox" value="" className="sr-only peer" onChange={(e) =>controlPost(e,data.response._id)} checked />:
            <input type="checkbox" value="" className="sr-only peer" onChange={(e) =>controlPost(e,data.response._id)}  />
            }
          <div className="w-11 h-6  bg-green-300 rounded-full peer peer-focus:ring-4 peer-focus:ring-red-300 dark:peer-focus:ring-red-800 dark:bg-gray-700 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-red-600"></div>
          </label>
       </Td>
      </Tr>
      ))}
    </Tbody>
    <div className='p-2 '>
   <Pagination  totalPost = {report.length} postPerPage={postPerPage} setCurrentpage={setCurrentPage}  currentPage={currentPage}/>
  </div>
  </Table>
</TableContainer>
    </div>
    </>
  )
}

export default Report
