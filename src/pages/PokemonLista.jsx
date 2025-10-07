import { useState, useEffect } from 'react'

function PokemonLista() {

  const [pokemones, setPokemones] = useState([])
  useEffect(() => {
    fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      .then(res => res.json())
      .then(data => setPokemones(data.results))
  }, [])

  if (!pokemones) return <p>Cargando...</p>

  return (
    <>
      <h1>Lista de Pokemones</h1>
      <p>Aquí puedes ver todos los pokemones disponibles</p>
      <ul>
        {pokemones.map(pokemon => (
          <li key={pokemon.name}>
            <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
          </li>
        ))}
      </ul>
    </>
  )
}

export default PokemonLista
import { Link } from 'react-router-dom'