import { Route, Routes } from 'react-router-dom'

import { Header, MenuBody, ProfileModal, LoginModal } from '@/components'

import UsersList from './UsersList'
import About from './About'

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
        <Route
          path='/about'
          element={<About />}
        />
      </Routes>
      <ProfileModal />
      <LoginModal />
      <MenuBody />
    </>
  )
}

export default Home
