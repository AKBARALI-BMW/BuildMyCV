import { Route, Routes } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Preview from './pages/Preview'
import Login from './pages/Login'
import Layout from './pages/Layout'
import ResumeBuilder from './pages/ResumeBuilder'
import Home from './pages/Home'  // change from 'lucide-react' to your own Home page

const App = () => {
  return (


    <Routes>
      <Route path="/" element={<Home />} />
      {/* nested layout routes */}
      <Route path="app" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="builder/:resumeId" element={<ResumeBuilder />} />
        <Route path="view/:resumeId" element={<Preview />} />
      </Route>
      {/* auth */}
      <Route path="login" element={<Login />} />
    </Routes>
  )
}

export default App
