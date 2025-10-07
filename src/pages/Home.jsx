function Home() {
  return (
    <>
      <h1>Pokedex Express</h1>
      <p>Bienvenides!!</p>
      <p>Selecciona un pokemon para ver sus detalles</p>
      <p>¡Diviértete explorando el mundo de los pokemones!</p>

      <Link to="/pokemon">Ver Pokemons</Link>

    </>
  )
}

export default Home
import { Link } from 'react-router-dom'