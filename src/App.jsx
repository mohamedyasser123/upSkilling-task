import { Route, Routes } from 'react-router-dom'
import { AddUser } from './components/AddUser'
import { Home } from './pages/Home'


function App() {


  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-user" element={<AddUser />} />
    </Routes>
    </>
  )
}

export default App
