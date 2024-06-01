import { useState } from 'react'
import { useSignalEffect } from '@preact/signals-react/runtime'

import { loginOpen } from '@/signals'
import { Drawer, Box, Link } from '@mui/material'
import LoginForm from './LoginForm'
import SignUpForm from './SignUpForm'

const LoginModal: React.FC = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true)

  useSignalEffect(() => {
    if (!loginOpen.value) {
      setIsLogin(true)
    }
  })

  const toggleIsLogin = (): void => {
    setIsLogin((prev) => !prev)
  }

  return (
    <Drawer
      anchor='right'
      open={loginOpen.value}
      onClose={() => {
        loginOpen.value = false
      }}
      aria-labelledby='login-modal-title'
      aria-describedby='login-modal-description'
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        role='presentation'
        onClick={() => {
          loginOpen.value = false
        }}
        onKeyDown={() => {
          loginOpen.value = false
        }}
        sx={{
          width: 400,
          bgcolor: 'background.paper',
          p: 4,
        }}
      >
        {isLogin ? <LoginForm /> : <SignUpForm />}
        <p>
          {isLogin ? "Don't have an account yet?" : 'Already have an account?'}
        </p>
        <Link
          component='button'
          variant='body2'
          onClick={toggleIsLogin}
        >
          {isLogin ? 'Create Account' : 'Login'}
        </Link>
        {/* </Box> */}
      </Box>
    </Drawer>
  )
}

export default LoginModal
