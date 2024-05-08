import '@/App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'

function App() {
  return (
    <Routes>
      {/* TODO: add a loader to the Route */}
      <Route
        path='/'
        element={<Home />}
      />
    </Routes>
  )
}
export default App
