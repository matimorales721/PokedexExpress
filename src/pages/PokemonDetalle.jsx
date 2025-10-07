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
    <>
      <h2>Detalle del Pokemon</h2>
      <p>{pokemon.name}</p>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />

      <h3>Tipos</h3>
      <ul>
        {pokemon.types.map(type => (
          <li key={type.type.name}>{type.type.name}</li>
        ))}
      </ul>

      <h3>Stats</h3>
      <ul>
        {pokemon.stats.map(stat => (
          <li key={stat.stat.name}>{stat.stat.name}: {stat.base_stat}</li>
        ))}
      </ul>

      <h3>Movimientos</h3>
      <ul>
        {pokemon.moves.map(move => (
          <li key={move.move.name}>{move.move.name}</li>
        ))}
      </ul>
    </>
  )
}

export default PokemonDetalle
import { Link } from 'react-router-dom'