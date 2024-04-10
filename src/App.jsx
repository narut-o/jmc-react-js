import { useContext, useEffect } from 'react'
import axios from 'axios'
import { Context, server } from './main';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import Home from './pages/Home';
import Header from './components/Header';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile'
import UserHome from './pages/UserHome';
import AdminHome from './pages/AdminHome';
import SuperAdmin from './pages/SuperAdmin';
import Employees from './pages/Employees';
import Complaints from './pages/Complaints';
import AllComplaints from './pages/AllComplaints';



function App() {
const {setIsAuthenticated,setUser,setLoading,isAuthenticated} = useContext(Context);
useEffect(()=>{
     setLoading(true);
      axios.get(`${server}/users/me`,{withCredentials:true}).then(res=>{
      setLoading(false);
      setUser(res.data.user);
      setIsAuthenticated(true);
     }).catch((err)=>{
      setLoading(false);
      setUser({});
      setIsAuthenticated(false);

     })

},[isAuthenticated])
  

  return (
  <Router>
    <Header/>
    <Routes>
    <Route path='/' element={<Home/>}/>
     <Route path='/register' element={<Register/>} />
     <Route path='/login' element={<Login/>} />
     <Route path='/profile' element={<Profile/>}/>
     <Route path='/admin' element={<AdminHome/>}/>
     <Route path='/user' element={<UserHome/>}/>
     <Route path='/super/admin' element={<SuperAdmin/>}/>
     <Route path='/super/admin/employees' element={<Employees/>} />
     <Route path='/super/admin/complaints' element={<Complaints/>} />
     <Route path='/super/admin/all/complaints' element={<AllComplaints/>} />

    </Routes>
    <Toaster/>

  </Router>
  )
}

export default App




