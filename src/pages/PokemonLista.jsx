import { useState, useEffect } from 'react'
import PokemonTarjeta from '../components/PokemonTarjeta'


function PokemonLista() {

  const [pokemones, setPokemones] = useState([])


  function getPokemons()
  {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${pokemones.length}`)
      .then(res => res.json())
      .then(data => setPokemones([...pokemones, ...data.results.map((p) => ({
        name: p.name,
        id: obtenerIdDesdeLink(p.url),
        sprites: {
          other: {
            dream_world: {
              front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${obtenerIdDesdeLink(p.url)}.svg`
            }
          }
        }
      }))]))
      .catch(err => console.log(err))
  }

  function obtenerIdDesdeLink(url) {
    const match = url.match(/\/(\d+)\/?$/);
    return match ? match[1] : null;
  }

  useEffect(() => {
    getPokemons()
  }, [])

  const cargarMasPokemones = () => {
    getPokemons()
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