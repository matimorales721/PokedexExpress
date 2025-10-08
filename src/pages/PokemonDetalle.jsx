import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

function PokemonDetalle() {

  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  
  // Llamada a la API cuando name cambia
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => setPokemon(data))
  }, [name])

  if (!pokemon) return <p>Cargando...</p>

  return (
    <div className='pokemon-detalle'>
      <button className='btn-volver'><Link to='/pokemon'> ← Volver</Link></button>
      <div className='title'>{pokemon.name} - <span className='pokemon-id'>#{pokemon.id}</span></div>
      
      <img src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
      
      <div className='pokemon-detalle-info'>
        <h3 className='pokemon-detalle-info-titulo'>Tipos</h3>
        <div className='pokemon-detalle-info-valor tagBox'>
          {pokemon.types.map(type => (
            <div className='tagTipo' key={type.type.name}>{type.type.name}</div>
          ))}
        </div>
      </div>

      <div className='pokemon-detalle-info'>
        <h3 className='pokemon-detalle-info-titulo'>Stats</h3>
        <div className='pokemon-detalle-info-valor'>
          <div className='listBox'>
            {pokemon.stats.map(stat => (
              <div className='listItem' key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</div>
            ))}
          </div>
        </div>
      </div>

      <div className='pokemon-detalle-info'>
        <h3 className='pokemon-detalle-info-titulo'>Habilidades</h3>
        <div className='pokemon-detalle-info-valor'>
          <div className='listBox'>
            {pokemon.abilities.map(ability => (
              <div className='listItem' key={ability.ability.name}>{ability.ability.name}</div>
            ))}
          </div>
        </div>
      </div>

      <div className='pokemon-detalle-info'>
        <h3 className='pokemon-detalle-info-titulo'><div className='titulo-vertical'>Movimientos</div></h3>
        <div className='pokemon-detalle-info-valor'>
          <div className='listBox'>
          {pokemon.moves.map(move => (
            <div className='listItem' key={move.move.name}>{move.move.name}</div>
          ))}
          </div>
        </div>
      </div>

      <div className='botoneraAnteriorSiguiente'>
        {<button className='btn-anterior'><Link to={`/pokemon/${pokemon.id - 1}`}>Anterior</Link></button>}
        {<button className='btn-siguiente'><Link to={`/pokemon/${pokemon.id + 1}`}>Siguiente</Link></button>}
      </div>


    </div>
  )
}

export default PokemonDetalle
import { Link } from 'react-router-dom'