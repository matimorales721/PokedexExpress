import './App.css'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import PokemonLista from './pages/PokemonLista.jsx'
import PokemonDetalle from './pages/PokemonDetalle.jsx'
import Favoritos from './pages/Favoritos.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './pages/Footer.jsx'

import imagenDeFondo from './images/pokeball_pattern.jpg'
import imagenDeFondo2 from './images/fondo_negro_ash_pikachu.jpg'
import 'bootstrap/dist/css/bootstrap.min.css'

function App() {

  return (
    <div className='imagen-fondo' style={{ backgroundImage: `url(${imagenDeFondo2})`}}>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pokemon" element={<PokemonLista />} />
        <Route path="/pokemon/:name" element={<PokemonDetalle />} />
        <Route path="/favoritos" element={<Favoritos />} />
        <Route path="/footer" element={<Footer />} />
      </Routes>
      <Footer />
    </div>   
  )
}

export default App
