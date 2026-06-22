import { BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "./pages/HomePage"
import Navbar from "./components/Navbar"
import Register from "./pages/RegisterUser"
import Login from "./pages/LoginUser"
import Profile from "./pages/Profile"
import Job from "./pages/Job"
import JobDetail from "./pages/JobDetail"
import Applications from "./pages/Applications"

function App(){
  return(
    <BrowserRouter>
    <Navbar/>

    <Routes>
      <Route path="/register" element={<Register/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/profile" element={<Profile/>}/>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/jobs" element={<Job/>}/>
      <Route path="/jobs/:_id" element={<JobDetail/>}/>
      <Route path="/applications" element={<Applications/>}/>

    </Routes>
    </BrowserRouter>
  )
}
export default App