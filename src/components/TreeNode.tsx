import React, { useState } from "react"

import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/20/solid"

import type { TreeTableProps } from "./TreeTable"

interface TreeNodeProps {
  item: any
  columns: TreeTableProps["columns"]
  level: number
}

function renderCell(
  column: TreeNodeProps["columns"][number],
  value: any,
  data: any,
  index: number,
  level: number
) {
  return column.render ? column.render(value, data, index, level) : value
}

export const TreeNode: React.FC<TreeNodeProps> = ({ item, columns, level }) => {
  const [isExpanded, setIsExpanded] = useState(true)

  const hasChildren = item.children && item.children.length > 0

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  return (
    <>
      <tr className="hover:bg-gray-50">
        {columns.map((column, index) => (
          <td
            key={column.key}
            className="px-6 py-4 whitespace-nowrap text-sm text-gray-500"
            style={{ width: column.width }}>
            <div className="flex items-center" style={{ width: column.width }}>
              {index === 0 && (
                <>
                  <div
                    className="shrink-0"
                    style={{ width: `${level * 20}px` }}
                  />
                  {hasChildren && (
                    <button
                      onClick={toggleExpand}
                      className="mr-2 text-gray-400 hover:text-gray-600">
                      {isExpanded ? (
                        <ChevronDownIcon className="h-5 w-5" />
                      ) : (
                        <ChevronRightIcon className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </>
              )}
              <div className="truncate">
                {renderCell(column, item[column.key], item, index, level)}
              </div>
            </div>
            {/* {index === 0 && (
              <div
                className="flex items-center"
                style={{ width: column.width }}>
                <div style={{ width: `${level * 20}px` }} />
                {hasChildren && (
                  <button
                    onClick={toggleExpand}
                    className="mr-2 text-gray-400 hover:text-gray-600">
                    {isExpanded ? (
                      <ChevronDownIcon className="h-5 w-5" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5" />
                    )}
                  </button>
                )}
                {renderCell(column, item[column.key], item, index, level)}
              </div>
            )}
            {index !== 0 &&
              renderCell(column, item[column.key], item, index, level)} */}
          </td>
        ))}
      </tr>
      {isExpanded &&
        hasChildren &&
        item.children.map((child: any) => (
          <TreeNode
            key={child.id}
            item={child}
            columns={columns}
            level={level + 1}
          />
        ))}
    </>
  )
}
