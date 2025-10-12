import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { selectFavoritosCount } from '../store/favoritosSlice'
import pokedexIcono from '../images/pokedex-icono.svg'

function Navbar() {
  const favoritosCount = useSelector(selectFavoritosCount)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  // Cerrar menú cuando se redimensiona la ventana a desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false)
      }
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('nav')) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [isMenuOpen])
  
  return (
    <>
      <nav>
        <div className='nav-title'>
          <img src={pokedexIcono} width={50} alt="Logo" />
          Pokedex Express
        </div>
        
        {/* Botón hamburguesa */}
        <button 
          className={`hamburger-button ${isMenuOpen ? 'hamburger-open' : ''}`}
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>

        <div className={`nav-links ${isMenuOpen ? 'nav-links-open' : ''}`}>
          <ul>
            <li>
              <Link to="/" onClick={closeMenu}>Home</Link>
            </li>
            <li>
              <Link to="/pokemon" onClick={closeMenu}>Pokémon</Link>
            </li>
            <li>
              <Link to="/favoritos" onClick={closeMenu}>
                ❤️ Favoritos  {favoritosCount > 0 && `(${favoritosCount})`}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      
      {/* Overlay para cerrar el menú en móviles */}
      {isMenuOpen && <div className="nav-overlay" onClick={closeMenu}></div>}
    </>
  )
}

export default Navbar
