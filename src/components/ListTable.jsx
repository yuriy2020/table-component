import React, { useState } from 'react'
import { FixedSizeList as List } from 'react-window'
import ResizeObserver from 'rc-resize-observer'
import classNames from 'classnames'
import { Table } from 'antd'
import 'antd/dist/antd.css'
import './GridTable.css'
import { Resizable } from 'react-resizable'

function ListTable({ columns, dataSource, setColumns, ...restProps }) {
  const [tableWidth, setTableWidth] = useState(0)

  const widthColumnCount = columns.filter(({ width }) => !width).length
  const mergedColumns = columns.map((column, index) => {
    if (column.width) {
      return column
    }

    return {
      ...column,
      width: column.width || Math.floor(tableWidth / widthColumnCount),
      onHeaderCell: (column) => ({
        width: column.width,
        onResize: handleResize(index),
      }),
    }
  })

  const handleResize =
    (index) =>
    (e, { size }) => {
      console.log('handleResize', size.width)
      const nextColumns = [...columns]
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      }
      setColumns(nextColumns)
    }

  const Row = (props) => {
    console.log(props)
    const { index, style, children } = props
    return (
      <tr data-row-key={index} className={['ant-table-row', 'ant-table-row-level-0'].join(' ')} style={style}>
        {columns.map((col) => {
          // console.log(col.dataIndex, index);
          return <td className={'ant-table-cell'}>{dataSource[index][col.dataIndex]}</td>
        })}
      </tr>
    )
  } 

  const RenderVirtualList = (props) => {
    const { className, children } = props
    // console.log('>>>>', children)
    return (
      
        <List height={500} itemCount={dataSource.length || 0} itemSize={35} width={tableWidth} itemData={props} outerElementType={"tbody"}>
          {Row}
        </List>
    
    )
  }
  return (
    <ResizeObserver
      onResize={({ width }) => {
        setTableWidth(width)
      }}
    >
      <Table
        {...restProps}
        className='virtual-table'
        dataSource={dataSource}
        columns={mergedColumns}
        pagination={false}
        components={{
          header: {
            cell: ResizableTitle,
          },
          body: { wrapper: RenderVirtualList},
        }}
      />
    </ResizeObserver>
  )
}

export { ListTable }

const ResizableTitle = (props) => {
  const { onResize, width, ...restProps } = props

  if (!width) {
    return <th {...restProps} />
  }

  return (
    <Resizable
      width={width}
      height={0}
      handle={
        <span
          className='react-resizable-handle'
          onClick={(e) => {
            e.stopPropagation()
          }}
        />
      }
      onResize={onResize}
      draggableOpts={{ enableUserSelectHack: false }}
    >
      <th {...restProps} />
    </Resizable>
  )
}
