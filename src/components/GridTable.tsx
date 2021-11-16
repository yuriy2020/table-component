import React, { useState, useEffect, useRef } from 'react'
import { VariableSizeGrid as Grid } from 'react-window'
import ResizeObserver from 'rc-resize-observer'
import classNames from 'classnames'
import { Table } from 'antd'
import './GridTable.css'

import { Resizable } from 'react-resizable'
import { ColumnsType } from 'antd/lib/table'

export function GridTable(props: Parameters<typeof Table>[0]) {
  // @ts-ignore
  const { columns, dataSource, setColumns, ...restProps } = props

  ///===========================================

  const scroll = {
    y: 300,
    x: '100vw',
  }
  const [tableWidth, setTableWidth] = useState(0)

  const handleResize =
    (index: number) =>
    // @ts-ignore
    (e, { size }) => {
      // columns = (columns || []) as ColumnsType<object>;
      console.log('handleResize', size.width);

      const nextColumns = [...(columns || [])]
      nextColumns[index] = {
        ...nextColumns[index],
        width: size.width,
      }
      setColumns(nextColumns);
    }

  const widthColumnCount = columns!.filter(({ width }) => !width).length
  const mergedColumns = columns!.map((column, index) => {
    if (column.width) {
      return column
    }

    return {
      ...column,
      width: column.width || Math.floor(tableWidth / widthColumnCount),
      onHeaderCell: (column: any) => ({
        width: column.width,
        onResize: handleResize(index),
      }),
    }
  })

  const gridRef = useRef<any>()
  const [connectObject] = useState<any>(() => {
    const obj = {}
    Object.defineProperty(obj, 'scrollLeft', {
      get: () => null,
      set: (scrollLeft: number) => {
        if (gridRef.current) {
          gridRef.current.scrollTo({ scrollLeft })
        }
      },
    })

    return obj
  })

  const resetVirtualGrid = () => {
    if (gridRef.current) {
      gridRef.current.resetAfterIndices({
        columnIndex: 0,
        shouldForceUpdate: true,
      })
    }
  }

  useEffect(() => resetVirtualGrid, [tableWidth])

  const renderVirtualList = (rawData: object[], { scrollbarSize, ref, onScroll }: any) => {
    ref.current = connectObject
    const totalHeight = rawData.length * 54

    return (
      <Grid
        ref={gridRef}
        className='virtual-grid'
        columnCount={mergedColumns.length}
        columnWidth={(index: number) => {
          const { width } = mergedColumns[index]
          return totalHeight > scroll!.y! && index === mergedColumns.length - 1
            ? (width as number) - scrollbarSize - 1
            : (width as number)
        }}
        height={scroll!.y as number}
        rowCount={rawData.length}
        rowHeight={() => 54}
        width={tableWidth}
        onScroll={({ scrollLeft }: { scrollLeft: number }) => {
          onScroll({ scrollLeft })
        }}
      >
        {({ columnIndex, rowIndex, style }: { columnIndex: number; rowIndex: number; style: React.CSSProperties }) => (
          <div
            className={classNames('virtual-table-cell', {
              'virtual-table-cell-last': columnIndex === mergedColumns.length - 1,
            })}
            style={style}
          >
            {(rawData[rowIndex] as any)[(mergedColumns as any)[columnIndex].dataIndex]}
          </div>
        )}
      </Grid>
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
        // @ts-ignore
        dataSource={dataSource}
        // @ts-ignore
        columns={mergedColumns}
        pagination={false}
        components={{
          header: {
            cell: ResizableTitle,
          },
          body: renderVirtualList as any, // ! as any
        }}
      />
    </ResizeObserver>
  )
}

const ResizableTitle = (props: any) => {
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
