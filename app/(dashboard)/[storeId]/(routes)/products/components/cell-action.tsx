'use client'

import React, { useState } from 'react'

import { ProductColumn } from './columns'
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { MoreHorizontal, Edit, Copy, Trash } from 'lucide-react'
import toast from 'react-hot-toast'
import { useParams, useRouter } from 'next/navigation'
import axios from 'axios'
import AlertModal from '@/components/modals/alert-modal'

interface CellActionProps {
  data: ProductColumn
}

const CellAction: React.FC<CellActionProps> = ({ data }) => {
  const router = useRouter()
  const params = useParams()

  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/${params.storeId}/products/${data.id}`)
      router.refresh()
      router.push(`${params.storeId}/products`)
      toast.success('Product deleted!')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id)
    toast.success('Id copied to clipboard.')
  }
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-12 w-12 p-0">
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 h-6 w-6" />
            Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(`/${params.storeId}/products/${data.id}`)
            }
          >
            <Edit className="mr-2 h-6 w-6" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-6 w-6" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  )
}

export default CellAction
