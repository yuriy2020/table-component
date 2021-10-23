import React, { ReactElement, useEffect, useState, useRef } from 'react'
import { FixedSizeList } from 'react-window'
import InfiniteLoader from 'react-window-infinite-loader'
import { VariableSizeGrid as Grid } from 'react-window'
import ResizeObserver from 'rc-resize-observer'
import classNames from 'classnames'
// import { useVT } from 'virtualedtableforantd4';

import { columnsApi, dataApi } from './api'
import { Table } from 'antd'
import 'antd/dist/antd.css'

interface Props {}

// ============ 1 ВАРИАНТ С ANTD-примера  (не работает !) ======================

// export function CustomTable() {
//   const [data, setData] = useState([])
//   const [columns, setColumns] = useState([])

//   const getData = async () => {
//     const response = await fetch(dataApi)
//     const res = await response.json()
//     setData(res)
//     console.log(res)
//   }

//   const getColumns = async () => {
//     const response = await fetch(columnsApi)
//     const res = await response.json()
//     setColumns(res)
//     console.log(res)
//   }

//   useEffect(() => {
//     getColumns()
//     getData()
//   }, [])

//   const scroll = {
//     y: 300,
//     x: '100vw',
//   }
//   const [tableWidth, setTableWidth] = useState(0)
//   const widthColumnCount = columns.filter(({ width }) => !width).length
//   const mergedColumns = columns.map((column):any => {
//     if (column.width) {
//       return column
//     }

//     return { ...column, width: Math.floor(tableWidth / widthColumnCount) }
//   })
//   const gridRef = useRef()
//   const [connectObject] = useState(() => {
//     const obj = {}
//     Object.defineProperty(obj, 'scrollLeft', {
//       get: () => null,
//       set: (scrollLeft) => {
//         if (gridRef.current) {
//           gridRef.current.scrollTo({
//             scrollLeft,
//           })
//         }
//       },
//     })
//     return obj
//   })

//   const resetVirtualGrid = () => {
//     gridRef.current.resetAfterIndices({
//       columnIndex: 0,
//       shouldForceUpdate: true,
//     })
//   }

//   useEffect(() => resetVirtualGrid, [tableWidth])

//   const renderVirtualList = (rawData, { scrollbarSize, ref, onScroll }) => {
//     ref.current = connectObject
//     const totalHeight = rawData.length * 54
//     return (
//       <Grid
//         ref={gridRef}
//         className='virtual-grid'
//         columnCount={mergedColumns.length}
//         columnWidth={(index) => {
//           const { width } = mergedColumns[index]
//           return totalHeight > scroll.y && index === mergedColumns.length - 1 ? width - scrollbarSize - 1 : width
//         }}
//         height={scroll.y}
//         rowCount={rawData.length}
//         rowHeight={() => 54}
//         width={tableWidth}
//         onScroll={({ scrollLeft }) => {
//           onScroll({
//             scrollLeft,
//           })
//         }}
//       >
//         {({ columnIndex, rowIndex, style }) => (
//           <div
//             className={classNames('virtual-table-cell', {
//               'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
//             })}
//             style={style}
//           >
//             {rawData[rowIndex][mergedColumns[columnIndex].dataIndex]}
//           </div>
//         )}
//       </Grid>
//     )
//   }

//   return (
//     <ResizeObserver
//       onResize={({ width }) => {
//         setTableWidth(width)
//       }}
//     >
//       <Table
//         {...props}
//         className='virtual-table'
//         columns={mergedColumns}
//         pagination={false}
//         components={{
//           body: renderVirtualList,
//         }}
//       />
//     </ResizeObserver>
//   )
// }

/// ================= 2 ВАРИАНТ ==================

export function CustomTable({}: Props): ReactElement {
  const [data, setData] = useState([])
  const [columns, setColumns] = useState([])

  const getData = async () => {
    const response = await fetch(dataApi)
    const res = await response.json()
    setData(res)
    console.log(res)
  }

  const getColumns = async () => {
    const response = await fetch(columnsApi)
    const res = await response.json()
    setColumns(res)
    console.log(res)
  }

  useEffect(() => {
    getColumns()
    getData()
  }, [])


  return (
    <div>
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        // components={{
        //   body: renderVirtualList,
        // }}
      />
    </div>
  )
}
