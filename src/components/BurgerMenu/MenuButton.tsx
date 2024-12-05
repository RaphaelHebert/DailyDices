import React from 'react'
import { IconButton } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import { menuModal } from '@/signals'

const MenuButton: React.FC = () => {
  return (
    <IconButton
      edge='start'
      color='inherit'
      aria-label='menu'
      onClick={() => {
        menuModal.value = true
      }}
    >
      <MenuIcon />
    </IconButton>
  )
}

export default MenuButton
