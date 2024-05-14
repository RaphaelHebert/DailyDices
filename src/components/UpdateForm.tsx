import React, { useState, ChangeEvent, FormEvent } from 'react'
import { Button, TextField } from '@mui/material'
import { useMutation } from 'react-query'
import * as yup from 'yup'

import { user } from '@/signals'
import { updateUser } from '@/api/user'
import { IUser } from '@/type/user'

interface FormData {
  email: string
  username: string
}

const UpdateForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    email: user.value.email,
    username: user.value.username,
  })
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [formErrors, setFormErrors] = useState<Partial<FormData>>({}) // State to track form errors

  const mutation = useMutation(updateUser, {
    onSuccess: () => {
      setIsUpdating(false)
    },
    onError: () => {
      console.log('TODO: handle catch')
    },
  })

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    try {
      // Validate form data using Yup schema
      await updateSchema.validate(formData, { abortEarly: false })
      const payload: IUser = {
        email: formData.email,
        username: formData.username,
        uid: user.value.uid,
      }
      mutation.mutate(payload)
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        // Update form errors state with Yup validation errors
        const errors: Partial<FormData> = {}
        error.inner.forEach((err) => {
          errors[err.path as keyof FormData] = err.message
        })
        setFormErrors(errors)
      }
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target
    // Control form
    setFormData({ ...formData, [name]: value })
    // Clear errors for changed field
    setFormErrors({ ...formErrors, [name]: undefined })
  }

  const updateSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    username: yup
      .string()
      .min(2, 'Username must be at least 8 characters')
      .required('Username is required'),
  })

  return (
    <form onSubmit={handleSubmit}>
      <h2 id='login-modal-title'>{user.value.username}</h2>

      <TextField
        name='email'
        id='emailInput'
        label='Email'
        variant='outlined'
        margin='normal'
        fullWidth
        required
        value={formData.email}
        disabled={!isUpdating}
        onChange={handleChange}
        error={!!formErrors.email} // Set error state based on formErrors
        helperText={formErrors.email} // Display error message if present
      />
      <TextField
        name='username'
        id='usernameInput'
        label='Username'
        variant='outlined'
        margin='normal'
        fullWidth
        required
        value={formData.username}
        disabled={!isUpdating}
        onChange={handleChange}
        error={!!formErrors.username} // Set error state based on formErrors
        helperText={formErrors.username} // Display error message if present
      />
      {!isUpdating ? (
        <Button
          type='submit'
          variant='outlined'
          color='primary'
          onClick={() => {
            setIsUpdating(true)
          }}
        >
          Update Account details
        </Button>
      ) : (
        <>
          <Button
            type='submit'
            variant='contained'
            color='primary'
            onClick={() => {
              console.log('updating...')
            }}
          >
            Confirm changes
          </Button>
          <Button
            type='submit'
            variant='contained'
            color='secondary'
            onClick={() => {
              setIsUpdating(false)
              setFormData({
                username: user.value.username,
                email: user.value.email,
              })
              setFormErrors({}) // Clear form errors
            }}
          >
            Cancel
          </Button>
        </>
      )}
    </form>
  )
}

export default UpdateForm
