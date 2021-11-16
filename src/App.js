import { ListTable } from './components/ListTable'
import './App.css'
import { GridTable } from './components/GridTable'
import React, { useState, useEffect } from 'react'
import { columnsApi, dataApi } from './api'
import { GridTableFromExampleAntd } from './components/GridTableFromExampleAntd'
import CustomTable from './components/CustomTable'

function App() {
  const [columns, setColumns] = useState([])
  const [data, setData] = useState([])

  const getData = async () => {
    try {
      const response = await fetch(dataApi)
      const res = await response.json()
      setData(res)
    } catch (error) {
      console.log(error)
    }
  }

  const getColumns = async () => {
    try {
      const response = await fetch(columnsApi)
      const res = await response.json()
      setColumns(res)
      // console.log(res)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getColumns()
    getData()
  }, [])
  return (
    <div style={{padding: 20 }}>
      {/* <ListTable columns={columns} dataSource={data} setColumns={setColumns}/> */}
      {/* <GridTable columns={columns} dataSource={data} setColumns={setColumns}/> */}
      {/* <GridTableFromExampleAntd columns={columns} dataSource={data}  scroll={{y:500, x: '100vw'}}/> */}
      <CustomTable columns={columns} dataSource={data} />
    </div>
  )
}

export default App
