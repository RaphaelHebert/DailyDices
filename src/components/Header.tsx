import ProfileButton from './ProfileButton'
import { LoginButton, MenuButton } from '@/components'
import { isLoggedIn } from '@/signals'

const Header: React.FC = () => {
  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <MenuButton />
      {isLoggedIn.value ? <ProfileButton /> : <LoginButton />}
    </div>
  )
}
export default Header
