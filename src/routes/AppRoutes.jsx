import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LayoutUser from '../layout/LayoutUser'
import BeforeLogin from '../components/registration/BeforeLogin'
import LayoutAdmin from '../layout/LayoutAdmin'
import Error404 from '../components/pages/Error404'
import { TOKEN_KEY } from '../services/apiService'
import PublicChat from '../components/pages/PublicChat'


const AppRoutes = () => {

  return (
    <div>
      <Router>
        <Routes>

          <Route path='/' element={localStorage[TOKEN_KEY] && < LayoutUser />}>
            {localStorage[TOKEN_KEY] ?
             <Route index element={<PublicChat/>} /> :
             <Route index element={<BeforeLogin/>} /> 
            }
          </Route>


          <Route path='/admin' element={<LayoutAdmin />}>

          </Route>

          <Route path='*' element={<Error404 />} />

        </Routes>
      </Router>
    </div>
  )
}

export default AppRoutes