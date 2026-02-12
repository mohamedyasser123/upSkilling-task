import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { EditUser } from './pages/EditUser'
import { AddUser } from './pages/AddUser'
function App() {
  return (
    <>
     <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/add-user" element={<AddUser />} />
      <Route path="/edit/:id" element={<EditUser />} />
    </Routes>
    </>
  )
}
export default App
