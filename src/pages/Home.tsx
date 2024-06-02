import { Route, Routes } from 'react-router-dom'

import LoginModal from '@/components/LoginModal'
import ProfileModal from '@/components/ProfileModal'

import { Header, MenuBody } from '@/components'

import UsersList from './UsersList'
import DiceRoll from './DiceRoll'
import PrivateRoute from '@/services/privateRoute'

const Home: React.FC = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route
          path='/usersList'
          element={<PrivateRoute />}
        >
          <Route
            path='/usersList'
            element={<UsersList />}
          />
        </Route>
        <Route
          path='/'
          element={<DiceRoll />}
        />
      </Routes>
      <ProfileModal />
      <LoginModal />
      <MenuBody />
    </>
  )
}

export default Home
