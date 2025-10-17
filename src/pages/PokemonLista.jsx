import { useState, useEffect } from 'react'
import PokemonTarjeta from '../components/PokemonTarjeta'
import Loading from '../images/loading.gif'

// Configuración de generaciones
const GENERACIONES = [
  { id: 1, nombre: 'Kanto', rangoInicio: 1, rangoFin: 151, gen: 'Gen I' },
  { id: 2, nombre: 'Johto', rangoInicio: 152, rangoFin: 251, gen: 'Gen II' },
  { id: 3, nombre: 'Hoenn', rangoInicio: 252, rangoFin: 386, gen: 'Gen III' },
  { id: 4, nombre: 'Sinnoh', rangoInicio: 387, rangoFin: 493, gen: 'Gen IV' },
  { id: 5, nombre: 'Teselia', rangoInicio: 494, rangoFin: 649, gen: 'Gen V' },
  { id: 6, nombre: 'Kalos', rangoInicio: 650, rangoFin: 721, gen: 'Gen VI' },
  { id: 7, nombre: 'Alola', rangoInicio: 722, rangoFin: 809, gen: 'Gen VII' },
  { id: 8, nombre: 'Galar', rangoInicio: 810, rangoFin: 898, gen: 'Gen VIII' },
  { id: 9, nombre: 'Paldea', rangoInicio: 899, rangoFin: 1003, gen: 'Gen IX' }
]

function PokemonLista() {

  const [pokemones, setPokemones] = useState([])
  const [generacionSeleccionada, setGeneracionSeleccionada] = useState(1) // Por defecto Kanto
  const [offset, setOffset] = useState(0) // Para paginación dentro de la generación
  const [cargando, setCargando] = useState(false)
  
  // Estados para el buscador
  const [nombreBusqueda, setNombreBusqueda] = useState('')
  const [mensajeError, setMensajeError] = useState('')
  const [modoBusqueda, setModoBusqueda] = useState(false) // Para saber si estamos en modo búsqueda

  // Obtener Pokémon de una generación específica
  function getPokemonsPorGeneracion(generacionId, esCargarMas = false) {
    setCargando(true)

    const generacion = GENERACIONES.find(gen => gen.id === generacionId)    
    const limit = 20
    const offsetGeneracion = esCargarMas ? offset : 0
    
    // Calcular el offset real para la API basado en la generación
    const offsetParaAPI = (generacion.rangoInicio - 1) + offsetGeneracion
    
    // Verificar que no excedamos el rango de la generación
    const maxPokemonEnGeneracion = generacion.rangoFin - generacion.rangoInicio + 1
    if (offsetGeneracion >= maxPokemonEnGeneracion) {
      setCargando(false)
      return
    }
    
    // Ajustar el limit si estamos cerca del final de la generación
    const pokemonRestantes = maxPokemonEnGeneracion - offsetGeneracion
    const limitAjustado = Math.min(limit, pokemonRestantes)

    fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limitAjustado}&offset=${offsetParaAPI}`)
      .then(res => res.json())
      .then(data => {

        const pokemonesMapeados = data.results.map(pokemon => ({
          name: pokemon.name,
          id: obtenerIdDesdeLink(pokemon.url),
          sprites: {
            other: {
              dream_world: {
                front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${obtenerIdDesdeLink(pokemon.url)}.svg`
              }
            }
          }
        }))

        if (esCargarMas) {
          setPokemones(prev => [...prev, ...pokemonesMapeados])
        } else {
          setPokemones(pokemonesMapeados)
        }
        setOffset(offsetGeneracion + pokemonesMapeados.length)
        setCargando(false)
      })
      .catch(err => {
        console.log('Error:', err)
        setCargando(false)
      })
  }

  // Función auxiliar para extraer ID de la URL
  const obtenerIdDesdeLink = (url) => {
    const match = url.match(/\/(\d+)\/?$/)
    return match ? parseInt(match[1]) : null
  }

  // Función auxiliar para determinar la generación de un Pokémon por su ID
  const obtenerGeneracionPorId = (pokemonId) => {
    for (const generacion of GENERACIONES) {
      if (pokemonId >= generacion.rangoInicio && pokemonId <= generacion.rangoFin) {
        return generacion.id
      }
    }
    return 1 // Por defecto Kanto si no se encuentra
  }

  // Cambiar generación
  const cambiarGeneracion = (generacionId) => {
    setGeneracionSeleccionada(generacionId)
    setOffset(0)
    setPokemones([])
    setModoBusqueda(false)
    setNombreBusqueda('')
    setMensajeError('')
    getPokemonsPorGeneracion(generacionId, false)
  }

  // Cargar más Pokémon de la generación actual
  const cargarMasPokemones = () => {
    getPokemonsPorGeneracion(generacionSeleccionada, true)
  }

  // Buscar Pokémon por nombre o ID
  const buscarPokemon = async () => {
    if (!nombreBusqueda.trim()) {
      setMensajeError('Por favor ingresa un nombre o ID de Pokémon')
      return
    }

    setCargando(true)
    setMensajeError('')
    
    try {
      // Detectar si es un número (ID) o texto (nombre)
      const busqueda = nombreBusqueda.trim()
      const esNumero = /^\d+$/.test(busqueda)
      
      // Si es número, usar directamente; si es texto, convertir a minúsculas
      const parametroBusqueda = esNumero ? busqueda : busqueda.toLowerCase()
      
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${parametroBusqueda}`)
      
      if (!response.ok) {
        throw new Error('Pokémon no encontrado')
      }
      
      const pokemon = await response.json()
      
      const pokemonMapeado = {
        name: pokemon.name,
        id: pokemon.id,
        sprites: {
          other: {
            dream_world: {
              front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.id}.svg`
            }
          }
        }
      }

      // Determinar y actualizar la generación correspondiente
      const generacionCorrespondiente = obtenerGeneracionPorId(pokemon.id)
      setGeneracionSeleccionada(generacionCorrespondiente)

      setPokemones([pokemonMapeado])
      setModoBusqueda(true)
      setCargando(false)
      
    } catch (error) {
      setMensajeError(`No se encontró el Pokémon "${nombreBusqueda}". Verifica que el nombre o ID esté correcto.`)
      setCargando(false)
    }
  }

  // Manejar Enter en el input de búsqueda
  const manejarEnterBusqueda = (e) => {
    if (e.key === 'Enter') {
      buscarPokemon()
    }
  }

  // Verificar si hay más Pokémon para cargar => hay mas hasta mientras el offset sea menor al maximo
  const hayMasPokemon = () => {
    const generacion = GENERACIONES.find(gen => gen.id === generacionSeleccionada)    
    const maxPokemonEnGeneracion = generacion.rangoFin - generacion.rangoInicio + 1
    return offset < maxPokemonEnGeneracion
  }

  useEffect(() => {
    // Cargar Kanto por defecto al montar el componente
    getPokemonsPorGeneracion(1, false)
  }, [])

  if (cargando && pokemones.length === 0) {
    return <div className='loading'><img src={Loading} alt="Cargando..." /></div>
  }

  const generacionActual = GENERACIONES.find(gen => gen.id === generacionSeleccionada)

  return (
    <div className='pokemon-list'>
      <br />
      <div className='title'>Lista de Pokémon</div>
      
      {/* Generaciones */}
      <div className='generaciones-contenedor'>
        <h3>Selecciona una Generación:</h3>
        <div className='generaciones-botones'>
          {GENERACIONES.map(generacion => (
            <button
              key={generacion.id}
              className={`btn-generacion ${generacionSeleccionada === generacion.id ? 'activo' : ''}`}
              onClick={() => cambiarGeneracion(generacion.id)}
              disabled={cargando}
            >
              <span className='gen-numero'>{generacion.gen}</span>
              <span className='gen-nombre'>{generacion.nombre}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Buscador por nombre o ID */}
      <div className='buscador-container'>
        <h3>🔍 Buscar Pokémon por nombre o ID:</h3>
        <div className='buscador-input-group'>
          <input
            type="text"
            className='buscador-input'
            placeholder="Ej: pikachu, charizard, 25, 150..."
            value={nombreBusqueda}
            onChange={(e) => setNombreBusqueda(e.target.value)}
            onKeyPress={manejarEnterBusqueda}
            disabled={cargando}
          />
          <button 
            className='btn-buscar'
            onClick={buscarPokemon}
            disabled={cargando || !nombreBusqueda.trim()}
          >
            {cargando ? 'Buscando...' : 'Buscar'}
          </button>
        </div>
        
        {/* Mensaje de error */}
        {mensajeError && (
          <div className='mensaje-error'>
            ⚠️ {mensajeError}
          </div>
        )}
      </div>
      
      {/* Grid de Pokémon */}
      <div className='pokemon-card-box Container-Fondo-Transparente'>        
        {pokemones.map(pokemon => (
          <PokemonTarjeta key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      
      {/* Indicador de carga */}
      {cargando && pokemones.length > 0 && (
        <div className='loading-more'>
          <img src={Loading} alt="Cargando más..." width="50" />
        </div>
      )}
      
      {/* Botón cargar más */}
      {hayMasPokemon() && !cargando && !modoBusqueda && (
        <div className='btn-cargar-mas' onClick={cargarMasPokemones}>
          Ver más Pokémon de {generacionActual?.nombre}
        </div>
      )}
      <br />
    </div>
  )
}

export default PokemonLista;