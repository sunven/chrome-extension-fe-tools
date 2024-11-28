import React from "react"

import { TreeNode } from "./TreeNode"

interface TreeData {
  id: string
  children?: TreeData[]
  [key: string]: any
}

export interface TreeTableProps {
  data: TreeData[] | undefined
  columns: {
    key: string
    header: string
    width?: string | number
    render?: (
      value: any,
      data: any,
      index: number,
      level: number
    ) => React.ReactNode
  }[]
}

export const TreeTable: React.FC<TreeTableProps> = ({ data, columns }) => {
  return (
    <table className="table-fixed w-full divide-y divide-gray-200">
      <thead className="bg-gray-50">
        <tr>
          {columns.map((column) => (
            <th
              key={column.key}
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider"
              style={{ width: column.width }}>
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {data?.map((item) => (
          <TreeNode key={item.id} item={item} columns={columns} level={0} />
        ))}
      </tbody>
    </table>
  )
}
