import React, { useState } from 'react'

export default (defValue) => {
    const [open, setOpen] = useState(defValue || false)
    const handleOpen = () => setOpen(!open)
    const handleClose = () => setOpen(!open)

  return [open, handleOpen, handleClose]
}