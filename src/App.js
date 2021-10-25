import { CustomTable } from './components/CustomTable'
import './App.css'
import { AntdTable } from './components/AntdTable'
import React, { useState, useEffect } from 'react'
import { columnsApi, dataApi } from './api'

function App() {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])
  const getData = async () => {
    const response = await fetch(dataApi)
    const res = await response.json()
    setData(res)
    // console.log(res)
  }

  const getColumns = async () => {
    const response = await fetch(columnsApi)
    const res = await response.json()
    setColumns(res)
    // console.log(res)
  }

  useEffect(() => {
    getColumns()
    getData()
  }, [])
  return (
    <>
      {/* <CustomTable /> */}
      <AntdTable columns={columns} dataSource={data} setColumns={setColumns}/>
    </>
  )
}

export default App
