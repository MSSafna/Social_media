import React, { useEffect, useState } from 'react'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import axios from 'axios';
function UserChart() {
    const [state, setState] = useState('daily')
    const [handleState, setHandleState] = useState(false)
    const [datas, setDatas] = useState([])


    useEffect(() => {
        const fecthData = async () => {
            const result = await axios.get(`/api/admin/getusers/${state}`)
            console.log(result);
            setDatas(result.data)

        }
        fecthData()
    }, [handleState])

    const getUserCount= ()=>{
        setHandleState(!handleState)
    }
    const data = datas

    return (
        <div >
            <div className='pt-4'>
                <h1 className='flex flex-row  justify-center text-2xl font-bold'>User's Report</h1>
                <Tabs variant='soft-rounded' colorScheme='green'>
                    <TabList>
                        <Tab onClick={() => {
                            setState('daily')
                            getUserCount()
                        }}>Daily</Tab>
                        <Tab onClick={()  =>{
                            setState('monthly')
                            getUserCount()

                        }}>Monthly</Tab>
                    </TabList>
                    <TabPanels>
                        <TabPanel>
                            <p>
                                <div className='flex flex-row justify-center '>
                                    <BarChart
                                        width={500}
                                        height={300}
                                        data={data}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                        barSize={20}
                                    >
                                        <XAxis dataKey="_id" scale="point" padding={{ left: 10, right: 10 }} />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Bar dataKey="user_count" fill="#8884d8" background={{ fill: '#eee' }} />
                                    </BarChart>
                                </div>
                            </p>
                        </TabPanel>
                        <TabPanel>
                            <p><div className='flex flex-row justify-center '>
                                    <BarChart
                                        width={800}
                                        height={300}
                                        data={data}
                                        margin={{
                                            top: 5,
                                            right: 30,
                                            left: 20,
                                            bottom: 5,
                                        }}
                                        barSize={20}
                                    >
                                        <XAxis dataKey="_id" scale="point" padding={{ left: 10, right: 10 }} />
                                        <YAxis />
                                        <Tooltip />
                                        <Legend />
                                        <CartesianGrid strokeDasharray="3 3" />
                                        <Bar dataKey="user_count" fill="#8884d8" background={{ fill: '#eee' }} />
                                    </BarChart>
                                </div></p>
                        </TabPanel>
                    </TabPanels>
                </Tabs>


            </div>

        </div>
    )
}

export default UserChart
