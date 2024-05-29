import React from 'react'
import { useNavigate } from 'react-router-dom'
import {
  IconButton,
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { menuModal } from '@/signals'

const MenuBody: React.FC = () => {
  const navigate = useNavigate()

  const menuItems = [
    { title: 'Home', path: '/' },
    { title: 'Users list', path: '/userslist' },
    { title: 'About', path: '/about' },
    { title: 'Contact', path: '/contact' },
  ]

  return (
    <Drawer
      anchor='left'
      open={menuModal.value}
      onClose={() => {
        menuModal.value = false
      }}
    >
      <div
        role='presentation'
        onClick={() => {
          menuModal.value = false
        }}
        onKeyDown={() => {
          menuModal.value = false
        }}
      >
        <IconButton>
          <CloseIcon />
        </IconButton>
        <Divider />
        <List>
          {menuItems.map(({ title, path }) => (
            <ListItemButton
              key={title}
              onClick={() => navigate(path)}
            >
              <ListItemText primary={title} />
            </ListItemButton>
          ))}
        </List>
      </div>
    </Drawer>
  )
}

export default MenuBody
