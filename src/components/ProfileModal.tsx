import LoginButton from './LoginButton'
import UpdateForm from './UpdateForm'
import DeleteForm from './DeleteForm'

import { profileOpen } from '@/signals'
import { Drawer, Box, Stack } from '@mui/material'

const ProfileModal: React.FC = () => {
  return (
    <Drawer
      anchor='right'
      open={profileOpen.value}
      onClose={() => {
        profileOpen.value = false
      }}
      aria-labelledby='profile-modal-title'
      aria-describedby='profile-modal-description'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        role='presentation'
        onClick={() => {
          profileOpen.value = false
        }}
        onKeyDown={() => {
          profileOpen.value = false
        }}
        sx={{
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
        }}
      >
        <Stack spacing={2}>
          <UpdateForm />
          <LoginButton />
          <DeleteForm />
        </Stack>
      </Box>
    </Drawer>
  )
}

export default ProfileModal
