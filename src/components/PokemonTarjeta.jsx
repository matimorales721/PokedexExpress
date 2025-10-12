import { Link } from 'react-router-dom'
import BotonFavoritos from './BotonFavoritos'

function PokemonTarjeta({ pokemon }) {
    const id3 = String(pokemon.id).padStart(3, '0');
    return (
        <div className='pokemon-card'>
            <Link to={`/pokemon/${pokemon.name}`}>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`} alt={pokemon.name} />
                <div className='pokemon-info'>
                    <span className='pokemon-name'>{pokemon.name}</span>
                    <span className='pokemon-id'>#{id3}</span>
                </div>
            </Link>
            <BotonFavoritos pokemon={pokemon} className="card-favorite-btn" />
        </div>
    );
}

export default PokemonTarjeta;