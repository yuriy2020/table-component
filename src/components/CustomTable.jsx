import React, { useState } from 'react'
import './CustomTable.scss'
import { FixedSizeList as List } from 'react-window'
import { VariableSizeGrid as Grid } from 'react-window'
import ResizeObserver from 'rc-resize-observer'

export default function CustomTable({ columns, dataSource }) {
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isNextPageLoading, setIsNextPageLoading] = useState(false)
  const [items, setItems] = useState([])

  // const Row = ({ row }) => (
  // 	<tr className={'table-body-row'}>
  // 		{columns.map((col) => (
  // 			<td className={'table-body-cell'} key={col.key}>
  // 				{row[col['dataIndex']]}
  // 			</td>
  // 		))}
  // 	</tr>
  // )

  const [tableWidth, setTableWidth] = useState(0)
  const widthColumnCount = columns.filter(({ width }) => !width).length
  const mergedColumns = columns.map((column) => {
    if (column.width) {
      return column
    }

    return { ...column, width: Math.floor(tableWidth / widthColumnCount) }
  })

  const Cell = ({ columnIndex, rowIndex, style }) => (
    <div
      className={
        columnIndex % 2
          ? rowIndex % 2 === 0
            ? 'GridItemOdd'
            : 'GridItemEven'
          : rowIndex % 2
          ? 'GridItemOdd'
          : 'GridItemEven'
      }
      style={style}
    >
      {dataSource[rowIndex][columns[columnIndex].dataIndex]}
    </div>
  )

  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width)
      }}
    >
      <div className='wrap-table'>
        <div className={'table'}>
          {/* HEAD TABLE */}
          <div className={'table-head'}>
            <div className={'table-head-row'}>
              {columns.map((col) => (
                <div className={'table-head-cell'} key={col.key}>
                  {col.title}
                </div>
              ))}
            </div>
          </div>
          {/* BODY TABLE */}
          {/* <tbody className={'table-body'}> */}
          {/* {dataSource.map((row) => (
            <Row row={row}/>
          ))} */}
          <Grid
            className='Grid'
            columnCount={columns.length}
            columnWidth={(index) => mergedColumns[index].width}
            height={500}
            rowCount={dataSource.length}
            rowHeight={() => 35}
            width={tableWidth}
          >
            {Cell}
          </Grid>
          {/* </tbody> */}
        </div>
      </div>
    </ResizeObserver>
  )
}

/*
request 

http://localhost:36058/api/newinc/
get?take=51
&skip=2
&sortDir=desc
&sortBy=dateCreated
&passportType=FullAndSopka
&settings={"sortByColumn":"","descending":false,"type":"","incFilters":{},"extFilters":{}}&onMy=3

*/
