function PokemonTarjeta({ pokemon }) {
    return (
        <div className='pokemon-card'>
            <Link to={`/pokemon/${pokemon.name}`}>
                <img src={pokemon.sprites.other['dream_world'].front_default} alt={pokemon.name} />
                <div className='pokemon-info'>
                    <span className='pokemon-name'>{pokemon.name}</span>
                    <span className='pokemon-id'>#{pokemon.id}</span>
                </div>
            </Link>
        </div>
    );
}
import { Link } from 'react-router-dom'
export default PokemonTarjeta;