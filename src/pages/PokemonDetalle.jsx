import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import pokebola from '../images/pokebola.png'
import BotonFavoritos from '../components/BotonFavoritos'

function PokemonDetalle() {

  const { name } = useParams()
  const [pokemon, setPokemon] = useState(null)
  
  // Llamada a la API cuando name cambia
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${name}`)
      .then(res => res.json())
      .then(data => {
        fetch(data.species.url)
          .then(res => res.json())
          .then(speciesData => {
            setPokemon({ ...data, species: speciesData })
          }
        )})
  }, [name])

  if (!pokemon) return <p>Cargando...</p>

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
            <div className='type-badge tagTipo' key={type.type.name}>{type.type.name}</div>
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
        {<button className='btn-anterior'><Link to={`/pokemon/${pokemon.id - 1}`}>Anterior</Link></button>}
        {<button className='btn-siguiente'><Link to={`/pokemon/${pokemon.id + 1}`}>Siguiente</Link></button>}
      </div>


    </div>
  )
}

export default PokemonDetalle
import { Link } from 'react-router-dom'