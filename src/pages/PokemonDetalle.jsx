import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import pokebola from '../images/pokebola.png'
import BotonFavoritos from '../components/BotonFavoritos'
import Loading from '../images/loading.gif'

function PokemonDetalle() {

  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  
  // Función para reproducir el cries del Pokémon
  const reproducirSonidoPokemon = (pokemonData) => {
    if (pokemonData.cries && pokemonData.cries.latest) {
      const audio = new Audio(pokemonData.cries.latest)
      audio.volume = 0.15
      audio.play().catch(error => {
        console.log('No se pudo reproducir el sonido:', error)
      })
    }
  }

  // Llamada a la API cuando name cambia
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => {
        fetch(data.species.url)
          .then(res => res.json())
          .then(speciesData => {
            const pokemonCompleto = { ...data, species: speciesData }
            setPokemon(pokemonCompleto)
            // Reproducir sonido cuando se carga el Pokémon
            reproducirSonidoPokemon(data)
          }
        )})
  }, [name])

  if (!pokemon) return <div className='loading'><img src={Loading} alt="Cargando..." /></div>;

  const id3 = String(pokemon.id).padStart(3, '0');

  return (
    <div className='pokemon-detalle'>
      <div className='contenedor-btn-volver'>
        <button className='btn-volver'><Link to='/pokemon'> ← Volver</Link></button>
        <BotonFavoritos pokemon={pokemon} className="detalle-favorite-btn" />
      </div>
      
      <div className='title'>{pokemon.name} - <span className='pokemon-id'>#{id3}</span></div>
      
      <div className="wrap">
        <img className="bg" src={pokebola} alt='Pokebola' />
        <img className="fg" src={pokemon.sprites.other['official-artwork'].front_default} alt={pokemon.name} />
      </div>
      
      <div className='pokemon-detalle-info'>
        <h3 className='pokemon-detalle-info-titulo'>Tipos</h3>
        <div className='pokemon-detalle-info-valor tagBox'>
          {pokemon.types.map(type => (
            <div className={`type-badge tagTipo type-${type.type.name}`} key={type.type.name}>{type.type.name}</div>
          ))}
        </div>
      </div>

      <div className='pokemon-detalle-info'>
        <h3 className='pokemon-detalle-info-titulo'>Descripción</h3>
        <div className='pokemon-detalle-info-valor2 '>
          <div className='pokemon-detalle-info-descripcion'>
            {pokemon.species.flavor_text_entries.find(entry => entry.language.name === 'es')?.flavor_text}
          </div>
        </div>
      </div>

      <div className='pokemon-detalle-info'>
        <h3 className='pokemon-detalle-info-titulo'>Stats</h3>
        <div className='pokemon-detalle-info-valor'>
          <div className='listBoxStats'>
            {pokemon.stats.map(stat => (
              <div className='listItem' key={stat.stat.name}><div className='listItemtitulo' key={stat.stat.name}>{stat.stat.name}:</div><div className='listItemValor' key={stat.stat.name + 'value'}>{ stat.base_stat }</div></div>
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
        <h3 className='pokemon-detalle-info-titulo'>Movimientos</h3>
        <div className='pokemon-detalle-info-valor'>
          <div className='listBox'>
          {pokemon.moves.map(move => (
            <div className='listItem' key={move.move.name}>{move.move.name}</div>
          ))}
          </div>
        </div>
      </div>

      <div className='botoneraAnteriorSiguiente'>
        {<Link className='btn-anterior' to={`/pokemon/${pokemon.id - 1}`}>Anterior</Link>}
        {<Link className='btn-siguiente' to={`/pokemon/${pokemon.id + 1}`}>Siguiente</Link>}
      </div>


    </div>
  )
}

export default PokemonDetalle