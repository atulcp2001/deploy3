import { Routes, Route  } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Layout from './components/Layout'
import Login from './features/auth/Login'
import DashLayout from './components/DashLayout'
import Welcome from './features/auth/Welcome'
import NotesList from './features/notes/NotesList'
import UsersList from './features/users/UsersList'

const App = () => {
 return (
  <Routes>
    
    <Route path='/' element={<Layout />}>
      
      <Route index element={<LandingPage />} />
      <Route path='login' element={<Login />}  />
      
      {/* Dashboard */}
      <Route path='dash' element={<DashLayout />} >
            <Route index element={<Welcome />} />

            <Route path='notes'>
              <Route index element={<NotesList />} />
            </Route>

            <Route path='users'>
              <Route index element={<UsersList /> } />
            </Route>
      </Route>
      {/* End of Dashboard */}

    </Route>
  </Routes>
 ) 
};

export default App;
