//import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import PokemonLista from './pages/PokemonLista.jsx'
import PokemonDetalle from './pages/PokemonDetalle.jsx'
import Navbar from './components/Navbar.jsx'
// import imagenDeFondo from './images/fondo_claro.png'
import imagenDeFondo from './images/pokeball_pattern.jpg'


function App() {
  //const [count, setCount] = useState(0)

  

  return (
    <div className='App' style={{ backgroundImage: `url(${imagenDeFondo})` }}>
      <div className='AppContent'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<PokemonLista />} />
          <Route path="/pokemon/:name" element={<PokemonDetalle />} />
          </Routes>
      </div>
    </div>
  )
}

export default App
