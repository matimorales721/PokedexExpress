import { useState, useEffect } from 'react'
import PokemonTarjeta from '../components/PokemonTarjeta'


function PokemonLista() {

  const [pokemones, setPokemones] = useState([])

  // useEffect(() => {
  //   fetch('https://pokeapi.co/api/v2/pokemon?limit=20&offset=0')
  //     .then(res => res.json())
  //     .then(data => setPokemones(data.results))
  // }, [])

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pokemones.length}`)
      .then(res => res.json())
      .then(data => { 
        // setPokemones(data.results)
        // Fetch adicional para obtener todas las propiedades, incluyendo ID
        Promise.all(data.results.map(pokemon => 
          fetch(pokemon.url)
            .then(res => res.json())
            .then(details => ({ ...pokemon, id: details.id, types: details.types, sprites: details.sprites , stats: details.stats, moves: details.moves }))
        )).then(pokemonesConId => setPokemones(pokemonesConId))
      })
  }, [])

  const cargarMasPokemones = () => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pokemones.length}`)
      .then(res => res.json())
      .then(data => { 
        // Fetch adicional para obtener todas las propiedades que necesito
        Promise.all(data.results.map(pokemon => 
          fetch(pokemon.url)
            .then(res => res.json())
            .then(details => ({ ...pokemon, id: details.id, sprites: details.sprites }))
        )).then(pokemonesConPropiedades => setPokemones([...pokemones, ...pokemonesConPropiedades]))
      })
  }


  if (!pokemones) return <p>Cargando...</p>

  return (
    <>
      <div className='title'>Lista de Pokemons</div>
      <div className='pokemon-card-box'>        
        {pokemones.map(pokemon => (
          <PokemonTarjeta key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <button className='btn-cargar-mas' onClick={cargarMasPokemones}>Ver más pokemones</button>
    </>
  )
}

export default PokemonLista;