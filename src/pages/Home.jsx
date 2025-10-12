import myGif from '../images/pokedex.gif'

function Home() {
  return (
    <div className='home'>
      <div className='title'>Pokedex Express</div>

      <img src={myGif} alt="pokedex" />
      <button className='btn-ver-pokemons'>
        <Link to="/pokemon">Ver Pokemons</Link>
      </button>
      <br />
      <button className='btn-ver-pokemons'>
        <Link to="/favoritos">Ver Favoritos</Link>
      </button>
      
    </div>
  )
}

export default Home
import { Link } from 'react-router-dom'