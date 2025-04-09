import { useContext } from "react"
import "./App.scss"
import Home from "./pages/home/Home.jsx"
import Login from "./pages/login/Login.jsx"
import Register from "./pages/register/Register.jsx"
import Watch from "./pages/watch/Watch.jsx"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthContext } from "./authContext/AuthContext.jsx"

function App() {
  const { user } = useContext(AuthContext)
  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="register" />} />
        <Route path="/movies" element={user ? <Home type={"movie"} /> : <Navigate to="register" />} />
        <Route path="/series" element={user ? <Home type={"series"} /> : <Navigate to="register" />} />
        <Route path="/watch" element={user ? <Watch /> : <Navigate to="register" />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      </Routes>
    </Router>
  )
}

export default App
