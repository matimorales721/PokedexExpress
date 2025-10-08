import { Link } from 'react-router-dom'
function Navbar() {
  return (
    <nav>
      
      <div className='nav-title'>
        <img src="./src/images/pokedex-icono.svg" width={50} alt="Logo" />
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
