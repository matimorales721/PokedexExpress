import myGif from '../images/pokedex.gif'

function Home() {
  return (
    <div className='home Container-Fondo-Transparente'>
      
      <div className='title'>Pokedex Express</div>
      
      <div className='home-text'>
        <p className="home-subtitle">Tu Pokédex rápida para explorar y guardar a tus Pokémon favoritos.</p>
        
        <p className="home-lead">
          Descubrí stats, tipos, movimientos y descripciones de la Pokédex.
          ¡Activá el sonido para escuchar sus cries!
        </p>
      </div>
      <img src={myGif} alt="pokedex" />
      
      <div className="home-botones">
        <Link className="btn btn-primary btn-ver-pokemons" to="/pokemon">Explorar Pokémons</Link>
        <Link className="btn btn-secondary btn-ver-favoritos" to="/favoritos">Ver Favoritos</Link>
      </div>

      <small className="home-text home-tip">Tip: tocá el corazón en cada tarjeta para marcarlo como Favorito!.</small>
      
    </div>
  )
}

export default Home
import { Link } from 'react-router-dom'