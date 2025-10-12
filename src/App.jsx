import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import PokemonLista from './pages/PokemonLista.jsx'
import PokemonDetalle from './pages/PokemonDetalle.jsx'
import Navbar from './components/Navbar.jsx'
import imagenDeFondo from './images/pokeball_pattern.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    
      <div className='imagen-fondo' style={{ backgroundImage: `url(${imagenDeFondo})`}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokemon" element={<PokemonLista />} />
          <Route path="/pokemon/:name" element={<PokemonDetalle />} />
        </Routes>
      </div>   
  )
}

export default App
