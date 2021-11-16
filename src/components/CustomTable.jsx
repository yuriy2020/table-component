import React, { useState } from 'react'
import './CustomTable.scss'

export default function CustomTable({ columns, dataSource }) {
  const [hasNextPage, setHasNextPage] = useState(true)
  const [isNextPageLoading, setIsNextPageLoading] = useState(false)
  const [items, setItems] = useState([])

  return (
    <div>
      <table className={'table'}>
        {/* HEAD TABLE */}
        <thead className={'table-head'}>
          <tr className={'table-head-row'}>
            {columns.map((col) => (
              <td className={'table-head-cell'} key={col.key}>
                {col.title}
              </td>
            ))}
          </tr>
        </thead>
        {/* BODY TABLE */}
        <tbody className={'table-body'}>
          {dataSource.map((row) => (
            <tr className={'table-body-row'}>
              {columns.map((col) => (
                <td className={'table-body-cell'} key={col.key}>
                    {row[col['dataIndex']]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
