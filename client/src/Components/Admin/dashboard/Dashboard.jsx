/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import Testing from './Table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { axiosPrivate as axios } from '../../../API/axios';
import UserChart from './UserChart';

function Dashboard() {
  const [state, setState] = useState('daily')
  const [datas, setDatas] = useState('')
  const [handleState, setHandleState] = useState(false)


  useEffect(() => {
    const fetchData = async () => {
  
      const result = await axios.get(`/api/admin/getposts/${state}`)
      setDatas(result.data)
    }
    fetchData()
  }, [handleState])

  const getPostCount = () => {
    setHandleState(!handleState)
  }
  const data = datas
  return (
    <div className='mt-10 w- bg-grey-100'>
      <h1 className='flex flex-row  justify-center text-2xl font-bold'>Posts Report</h1>
      <Tabs variant='soft-rounded' colorScheme='green'>
        <TabList>
          <Tab onClick={() => {
            setState('daily')
            getPostCount()
          }}>Daily</Tab>
          <Tab onClick={() => {
            setState('monthly')
            getPostCount()
          }}>Monthly</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <p className=' flex flex-row justify-center'>
              <div className='pt-2'>
                <LineChart
                  width={900}
                  height={500}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="post_count" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </div>
            </p>
          </TabPanel>
          <TabPanel>
            <p className=' flex flex-row justify-center'>
              <div className='pt-2'>
                <LineChart
                  width={900}
                  height={500}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="_id" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="post_count" stroke="#8884d8" activeDot={{ r: 8 }} />
                </LineChart>
              </div>
            </p>
          </TabPanel>
        </TabPanels>
      </Tabs>


     <UserChart/>
     



    </div>
  );
}

export default Dashboard;
