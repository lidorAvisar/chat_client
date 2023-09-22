import React, { useContext } from 'react'
import { AppContext } from '../../context/context';
import Register from './Register';
import Login from './Login';
import './BGbeforeLogin.css'


const BeforeLogin = () => {

  const { setRegister,register,setLogin,login } = useContext(AppContext);


  return (
    <div className='bgImg'>
      <Register
        show={register}
        onHide={() => setRegister(false)}
      />
      <Login
        show={login}
        onHide={() => setLogin(false)}
      />
    </div>
  )
}

export default BeforeLogin