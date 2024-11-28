import { TreeTable, type TreeTableProps } from "@/components/TreeTable"

import "@/globals.css"

import { useEffect, useState } from "react"

function renderDate(value: string) {
  return value ? new Date(value).toLocaleString() : value
}

const columns: TreeTableProps["columns"] = [
  {
    key: "title",
    header: "Title"
  },
  {
    key: "url",
    header: "URL",
    render(value) {
      return (
        <a href={value} target="_blank" className="[all:revert]">
          {value}
        </a>
      )
    }
  },
  {
    key: "dateAdded",
    header: "Date Added",
    width: "180px",
    render: renderDate
  },
  {
    key: "dateLastUsed",
    header: "Date Last Used",
    width: "180px",
    render: renderDate
  },
  {
    key: "dateGroupModified",
    header: "Date Group Modified",
    width: "200px",
    render: renderDate
  }
]

export default function Bookmarks() {
  const [bookmarks, setBookmarks] = useState<
    chrome.bookmarks.BookmarkTreeNode[]
  >([])
  useEffect(() => {
    chrome.bookmarks.getTree().then(setBookmarks)
  }, [])
  console.log("bookmarks", bookmarks)
  return (
    <div>
      <TreeTable data={bookmarks?.[0]?.children} columns={columns} />
    </div>
  )
}
