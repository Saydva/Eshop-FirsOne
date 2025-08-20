import { useEffect, useState } from 'react'
import { useAuthStore } from './pages/store/useAuthStore'
import Navbar from './pages/navbar/Navbar'
import ChangeThemeButton from './pages/navbar/ChangeTheme.button'
import AdminSidebar from './pages/sidebar.admin/SidebarAdmin'
import { Route, Routes } from 'react-router'
import HomePage from './pages/home/Home'
import ShopingCart from './pages/navbar/ShopingCart'
import Register from './components/auth/Register'
import Login from './components/auth/Login'
import ProductAdminList from './components/admin/product/ProductAdminList'

function App() {
  const [index, setIndex] = useState(0)
  const { isLoggedIn, user } = useAuthStore()
  const themes = ['valentine', 'nord', 'caramellatte', 'wireframe', 'business']

  useEffect(() => {
    const persisted = sessionStorage.getItem('user-storage')
    if (persisted) {
      console.log('Persisted user-store:', JSON.parse(persisted))
    } else {
      console.log('No persisted user-store in sessionStorage')
    }
  }, [isLoggedIn, user])

  const handleTheme = () => {
    setIndex((prevIndex) => (prevIndex + 1) % themes.length)
  }

  return (
    <div className='min-h-screen flex flex-col' data-theme={themes[index]}>
      <Navbar>
        <ShopingCart />
        <ChangeThemeButton handler={handleTheme} />
      </Navbar>
      {user?.role === 'admin' ? <AdminSidebar /> : null}
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/Register' element={<Register />} />
        <Route path='/Login' element={<Login />} />
      </Routes>
      <ProductAdminList />
    </div>
  )
}

export default App
