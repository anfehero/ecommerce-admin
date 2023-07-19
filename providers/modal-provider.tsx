'use client'
import { StoreModal } from '@/components/modals/store-modal'
import React, { useState, useEffect } from 'react'

const ModalProvider = () => {
  const [isMounted, setIsMouted] = useState(false)

  useEffect(() => {
    setIsMouted(true)
  }, [])

  if (!isMounted) {
    return null
  }

  return (
    <>
      <StoreModal />
    </>
  )
}

export default ModalProvider
