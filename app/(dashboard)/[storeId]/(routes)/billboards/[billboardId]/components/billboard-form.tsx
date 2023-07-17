'use client'

import React, { useState } from 'react'
import * as z from 'zod'
import { Billboard } from '@prisma/client'
import { Trash } from 'lucide-react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/Heading'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'
import AlertModal from '@/components/modals/alert-modal'
import { ApiAlert } from '@/components/ui/api-alert'
import { useOrigin } from '@/hooks/use-origin'

type BillboardFormValues = z.infer<typeof formSchema>

interface BillboardFormProps {
  initialData: Billboard | null
}

const formSchema = z.object({
  label: z.string().min(1),
  imageUrl: z.string().min(1)
})

const BillboardForm: React.FC<BillboardFormProps> = ({
  initialData
}) => {
  const params = useParams()
  const router = useRouter()
  const origin = useOrigin()

  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const title = initialData ? 'Edit billboard' : 'Create billboard'
  const description = initialData ? 'Edit a billboard' : 'Add a new billboard'
  const toastMessage = initialData ? 'Billboard updated' : 'Billboard created'
  const action = initialData ? 'Save Changes' : 'Create'

  const form = useForm<BillboardFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      label: '',
      imageUrl: ''
    }
  })

  const onSubmit = async (data: BillboardFormValues) => {
    try {
      setLoading(true)
      await axios.patch(`/api/stores/${params.storeId}`, data)
      router.refresh()
      toast.success('Store updated')
    } catch (error) {
      toast.error('Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const onDelete = async () => {
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${params.storeId}`)
      router.refresh()
      router.push('/')
      toast.success('Store deleted!')
    } catch (error) {
      toast.error('Make sure you removed all products and categories firt')
    } finally {
      setLoading(false)
      setOpen(false)
    }
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className='flex items-center justify-between'>
        <Heading
          title={title}
          description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant='destructive'
            size='icon'
            onClick={() => setOpen(true)}>
            <Trash className='h-4 w-4' />
          </Button>
        )}
      </div>

      <Separator />

      <Form
        {...form}>
        <form
          className='space-y-8 w-full'
          onSubmit={form.handleSubmit(onSubmit)}>
          <div className='grid grid-cols-3 gap-8'>
            <FormField
              control={form.control}
              name='label'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Label
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder='Billboard label'
                      {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
          </div>
          <Button
            disabled={loading}
            className='ml-auto'
            type='submit'>
            {action}
          </Button>
        </form>
        <Separator />

      </Form>
    </>
  )
}

export default BillboardForm