import { ListTable } from './components/ListTable'
import './App.css'
import { GridTable } from './components/GridTable'
import React, { useState, useEffect } from 'react'
import { columnsApi, dataApi } from './api'
import { GridTableFromExampleAntd } from './components/GridTableFromExampleAntd'

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
      {/* <ListTable columns={columns} dataSource={data} setColumns={setColumns}/> */}
      {/* <GridTable columns={columns} dataSource={data} setColumns={setColumns}/> */}
      <GridTableFromExampleAntd columns={columns} dataSource={data} />
    </>
  )
}

export default App
