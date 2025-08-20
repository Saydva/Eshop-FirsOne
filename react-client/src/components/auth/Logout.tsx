import { LogOut } from 'react-feather'
import { Logoutcontroller } from './user.controller'

const Logout = () => {
  const userState = sessionStorage.getItem('user-storage')
  const userId = userState ? JSON.parse(userState).state.user.id : null

  return (
    <button
      className='btn btn-circle size-6 p-1 ml-2'
      onClick={() => {
        Logoutcontroller(userId)
      }}
    >
      <LogOut />
    </button>
  )
}

export default Logout
