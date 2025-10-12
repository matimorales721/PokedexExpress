import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { selectFavoritos, selectFavoritosCount } from '../store/favoritosSlice'
import PokemonTarjeta from '../components/PokemonTarjeta'

function Favoritos() {
  const favoritos = useSelector(selectFavoritos)
  const favoritosCount = useSelector(selectFavoritosCount)

  if (favoritosCount === 0) {
    return (
      <div className='favoritos-page'>
        <div className='title'>Mis Favoritos</div>
        <div className='empty-favoritos'>
          <p>🤍 No tienes Pokémon favoritos aún</p>
          <p>Explora la lista de Pokémon y agrega algunos a tus favoritos</p>
          <Link to="/pokemon" className="btn-ver-pokemons">
            Ver Pokémon
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className='favoritos-page'>
      <div className='title'>Mis Favoritos ({favoritosCount})</div>
      <div className='pokemon-card-box Container-Fondo-Transparente'>
        {favoritos.map(pokemon => (
          <PokemonTarjeta key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
    </div>
  )
}

export default Favoritos