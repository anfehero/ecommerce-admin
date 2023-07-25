'use client'

import { ColumnDef } from '@tanstack/react-table'
import CellAction from './cell-action'
import { Check, X } from 'lucide-react'

export type ProductColumn = {
  id: string
  name: string
  price: string
  size: string
  category: string
  color: string
  isFeatured: boolean
  isArchived: boolean
  createdAt: string
}

export const columns: ColumnDef<ProductColumn>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'isArchived',
    header: 'Archived',
    cell: ({ row }) => (
      <div>
        {row.original.isArchived ? (
          <Check className="text-green-500" />
        ) : (
          <X className="text-rose-500" />
        )}
      </div>
    ),
  },
  {
    accessorKey: 'isFeatured',
    header: 'Featured',
    cell: ({ row }) => (
      <div>
        {row.original.isFeatured ? (
          <Check className="text-green-500" />
        ) : (
          <X className="text-rose-500" />
        )}
      </div>
    ),
  },
  {
    accessorKey: 'price',
    header: 'Price',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'size',
    header: 'Size',
  },
  {
    accessorKey: 'color',
    header: 'Color',
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original.color}
        <div
          className="h-6 w-6 rounded-full border"
          style={{ backgroundColor: row.original.color }}
        />
      </div>
    ),
  },
  {
    accessorKey: 'createdAt',
    header: 'Date',
  },
  {
    id: 'actions',
    cell: ({ row }) => <CellAction data={row.original} />,
  },
]
