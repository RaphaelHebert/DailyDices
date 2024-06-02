import DeleteIcon from '@mui/icons-material/Delete'
import { useMutation } from 'react-query'
import {
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Alert,
} from '@mui/material'

import { deleteUser } from '@/api'
import { user, profileOpen } from '@/signals'

import { logout } from '@/services'

import { signal, Signal } from '@preact/signals-react'

const isDeleting: Signal<boolean> = signal(false)
const isChecked: Signal<boolean> = signal(false)

const handleCheckboxChange = () => {
  isChecked.value = !isChecked.value
}

const DeleteForm: React.FC = () => {
  const deleteMutation = useMutation(deleteUser, {
    onSuccess: () => {
      logout()
      profileOpen.value = false
    },
    onError: (error: Error) => {
      // Handle errors, e.g., log them or show a notification
      console.log(error)
    },
  })

  return (
    <>
      {isDeleting.value && (
        <FormGroup>
          <Alert severity='warning'>You are about to delete your account</Alert>
          <FormControlLabel
            required
            sx={{ margin: 'auto' }}
            control={
              <Checkbox
                checked={isChecked.value}
                onChange={handleCheckboxChange}
              />
            }
            label='confirm account deletion'
          />
          <Button
            type='button'
            variant='contained'
            color='secondary'
            sx={{ flex: 1 }}
            onClick={() => {
              isDeleting.value = false
            }}
          >
            Cancel
          </Button>
        </FormGroup>
      )}
      <Button
        type='button'
        variant='outlined'
        color='secondary'
        onClick={() => {
          if (user.value && isDeleting.value && isChecked.value) {
            isChecked.value = false
            isDeleting.value = false
            deleteMutation.mutate()
          } else {
            isDeleting.value = true
          }
        }}
        startIcon={<DeleteIcon />}
        disabled={!isChecked.value && isDeleting.value}
      >
        delete my account
      </Button>
    </>
  )
}

export default DeleteForm
