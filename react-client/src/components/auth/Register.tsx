import { useState } from 'react'
import { useNavigateTo } from '../../utils/navigate'
import { useInputStore } from './useAuthInput.Store'
import { Registercontroller } from './user.controller'

const Register = () => {
  const {
    name,
    email,
    password,
    setName,
    setEmail,
    setPassword,
    resetValues,
    prefillValues,
    prefillValuesAdmin,
  } = useInputStore()

  const [admin, setAdmin] = useState('user')

  const navigateToLogin = useNavigateTo('/Login')

  return (
    <form
      onSubmit={async (e) => {
        try {
          e.preventDefault()
          await Registercontroller(name, email, password, admin)
          navigateToLogin()
          resetValues()
          alert('Registration successful! Please log in.')
        } catch (error: any) {
          console.log('Registration failed:', error)
          alert(
            'Registration failed: try to use other name or email, or leave as message: '
          )
        }
      }}
    >
      <div className='flex flex-col items-center justify-center  bg-base-100'>
        <fieldset className='fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4'>
          <legend className='fieldset-legend'>Register page</legend>
          <label htmlFor='name' className='label'>
            User name
          </label>
          <label className='input validator'>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              id='name'
              type='text'
              required
              placeholder='name'
              title='enter a valid name'
            />
          </label>

          <label htmlFor='email' className='label'>
            Your email
          </label>
          <label className='input validator'>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id='email'
              type='email'
              required
              placeholder='email'
              title='enter a valid email'
            />
          </label>

          <label htmlFor='password' className='label'>
            Password
          </label>
          <label className='input validator'>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              id='password'
              type='password'
              placeholder='Password'
              pattern='(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'
              title='Must be more than 8 characters, including number, lowercase letter, uppercase letter'
            />
          </label>
        </fieldset>
        <div className='flex justify-center mt-4'>
          <button type='submit' className='btn btn-secondary ml-2'>
            Register
          </button>
          <button
            className='btn ml-2'
            type='button'
            onClick={() => prefillValues()}
          >
            preffil
          </button>
          <button
            className='btn ml-2'
            type='button'
            onClick={() => {
              prefillValuesAdmin()
              setAdmin('admin')
            }}
          >
            Admin
          </button>
        </div>
      </div>
    </form>
  )
}

export default Register
