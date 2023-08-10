import { Routes, Route  } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Layout from './components/Layout'
import Login from './features/auth/Login'
import ForgotPassword from './features/auth/ForgotPassword'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'
import EditUser from './features/users/EditUser'
import NewUserForm from './features/users/NewUserForm'
import SignUpNewUserForm from './features/users/SignUpNewUserForm'
import EditNote from './features/notes/EditNote'
import NewNote from './features/notes/NewNote'
import Prefetch from './features/auth/Prefetch'
import PersistLogin from './features/auth/PersistLogin'
import RequireAuth from './features/auth/RequireAuth'
import { ROLES } from './config/role'
import useTitle from './hooks/useTitle'
import ResetPassword from './features/auth/ResetPassword'


const App = () => {
  useTitle('Trail Notes')
 return (
  <Routes>
    
    <Route path='/' element={<Layout />}>
      {/* public routes */}
      <Route index element={<LandingPage />} />
      <Route path='login' element={<Login />}  />
      <Route path='signup' element={<SignUpNewUserForm />} />
      <Route path='forgot-password' element={<ForgotPassword />} />
      <Route path='reset-password' element={<ResetPassword />} />
      
      {/* protected routes */}
      <Route element={<PersistLogin />}>
      <Route element={<RequireAuth allowedRoles={[...Object.values(ROLES)]} />}>
        {/* Start of Prefetch */}
        <Route element={<Prefetch />} >
        {/* Start Dashboard */}
        <Route path='dash' element={<DashLayout />} >
              <Route index element={<Welcome />} />

              <Route element={<RequireAuth allowedRoles={[ROLES.Coach, ROLES.Admin]} />}>
                  <Route path='users'>
                    <Route index element={<UsersList /> } />
                    <Route path=':id' element={<EditUser />} />
                    <Route path='new' element={<NewUserForm />} />
                  </Route>
              </Route>

              <Route path='notes'>
                <Route index element={<NotesList />} />
                <Route path=':id' element={<EditNote />} />
                <Route path='new' element={<NewNote />} />
              </Route>

            </Route>{/* End of Dashboard */}    
            </Route> {/* End of Prefetch */}
            </Route>   
       </Route> {/*End of protected routes */}
    </Route>
  </Routes>
 ) 
};

export default App;
