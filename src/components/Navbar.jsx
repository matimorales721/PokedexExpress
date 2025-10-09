import { Link } from 'react-router-dom'
import pokedexIcono from '../images/pokedex-icono.svg'

function Navbar() {
  return (
    <nav>
      
      <div className='nav-title'>
        <img src={pokedexIcono} width={50} alt="Logo" />
        Pokedex Express
      </div>
      <div className='nav-links'>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/pokemon">Pokemons</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
