import { useSelector, useDispatch } from 'react-redux'
import { addToFavoritos, removeFromFavoritos, selectIsFavorito } from '../store/favoritosSlice'

function BotonFavoritos({ pokemon, className = "" }) {
  const dispatch = useDispatch()
  const esFavorito = useSelector(state => selectIsFavorito(state, pokemon.name))

  const handleToggleFavorito = (e) => {
    e.preventDefault() // Evitar navegación si está dentro de un Link
    e.stopPropagation() // Evitar eventos de bubble
    
    if (esFavorito) {
      dispatch(removeFromFavoritos(pokemon.id))
    } else {
      dispatch(addToFavoritos(pokemon))
    }
  }

  return (
    <button 
      className={`favorite-button ${esFavorito ? 'favorite-active' : 'favorite-inactive'} ${className}`}
      onClick={handleToggleFavorito}
      title={esFavorito ? 'Quitar de favoritos' : 'Agregar a favoritos'}
      type="button"
    >
      {esFavorito ? (
        <span className="heart-filled">❤️</span>
      ) : (
        <span className="heart-empty">🤍</span>
      )}
    </button>
  )
}

export default BotonFavoritos