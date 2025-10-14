# 🌟 Pokédex Express

Una aplicación web moderna e interactiva de Pokédex desarrollada con React y Vite que permite explorar, descubrir y guardar como favoritos los Pokémones a tu gusto.

## ✨ Características Principales

- 🎯 **Lista completa**: Visualiza los tantos Pokémons como quieras con carga dinámica
- 🔍 **Detalles individuales**: Información completa de cada Pokémon (stats, tipos, habilidades, movimientos)
- ❤️ **Sistema de Favoritos**: Guarda tus Pokémon favoritos con Redux y persistencia local
- 📱 **Navegación Responsive**: Menú hamburguesa para dispositivos móviles
- 🎨 **Interfaz moderna**: Diseño temático con fuentes personalizadas de Pokémon
- ⚡ **Navegación rápida**: Sistema de routing optimizado con React Router
- 💾 **Persistencia**: Los favoritos se mantienen entre sesiones

## 🛠️ Tecnologías Utilizadas

### Frontend

- **React** 19.1.1 - Biblioteca de JavaScript para interfaces de usuario
- **Vite** 7.1.7 - Herramienta de construcción y desarrollo ultra-rápida
- **React Router DOM** 7.9.3 - Navegación y routing SPA

### Estado Global

- **Redux Toolkit** - Gestión de estado predecible
- **React Redux** - Integración de Redux con React

### API y Datos

- **PokéAPI** - API REST para datos completos de Pokémon
- **LocalStorage** - Persistencia de favoritos

### Estilos

- **CSS3** - Estilos personalizados con variables CSS
- **Fuentes Pokémon** - Tipografías temáticas (Hollow y Solid)
- **Responsive Design** - Media queries para dispositivos móviles

## 📦 Instalación

### Prerrequisitos

- **Node.js** (versión 16 o superior)
- **npm** o **yarn**

### Pasos de instalación

1. **Clona el repositorio**

   ```bash
   git clone https://github.com/matimorales721/tp-final-react-matias-morales.git
   cd tp-final-react-matias-morales
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   ```

## 🚀 Ejecución

Para ejecutar la aplicación:

```bash
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

## 🗂️ Estructura del Proyecto

```
tp-final-react-matias-morales/
├── public/
├── src/
│   ├── pages/
│   │   ├── Home.jsx                # Página principal de bienvenida
│   │   ├── PokemonLista.jsx        # Lista paginada de Pokémon
│   │   ├── PokemonDetalle.jsx      # Vista detallada de Pokémon
│   │   └── Favoritos.jsx           # Página de Pokémon favoritos
│   ├── components/
│   │   ├── Navbar.jsx              # Navegación responsive con hamburguesa
│   │   ├── PokemonTarjeta.jsx      # Tarjeta individual de Pokémon
│   │   └── FavoriteButton.jsx      # Botón para gestionar favoritos
│   ├── store/
│   │   ├── store.js                # Configuración de Redux Store
│   │   └── favoritesSlice.js       # Slice de Redux para favoritos
│   ├── assets/
│   │   ├── Pokemon Hollow.ttf      # Fuente personalizada
│   │   └── Pokemon Solid.ttf       # Fuente personalizada
│   ├── images/                     # Recursos gráficos y fondos
│   ├── App.jsx                     # Componente principal con routing
│   ├── App.css                     # Estilos principales y responsive
│   ├── index.css                   # Estilos globales base
│   └── main.jsx                    # Punto de entrada con Redux Provider
├── index.html
├── package.json
├── vite.config.js
├── eslint.config.js
└── README.md
```

## 🎮 Guía de Uso

### 🏠 **Página Principal**

- Pantalla de bienvenida con información del proyecto
- Navegación directa a la lista de Pokémon

### � **Lista de Pokémon**

- Visualización en grid responsive de tarjetas de Pokémon
- Carga dinámica de 20 Pokémon por vez
- Botón de "Cargar más" para paginación
- Botón de favorito en cada tarjeta (❤️/🤍)

### 🔍 **Detalles de Pokémon**

- Imagen oficial de alta calidad
- Información completa: tipos, estadísticas, habilidades, movimientos
- Navegación entre Pokémon (anterior/siguiente)
- Botón de favorito integrado

### ❤️ **Sistema de Favoritos**

- **Agregar**: Click en 🤍 para añadir a favoritos
- **Quitar**: Click en ❤️ para remover de favoritos
- **Ver favoritos**: Accede desde el navbar "❤️ Favoritos (X)"
- **Persistencia**: Los favoritos se guardan automáticamente

### 📱 **Navegación Móvil**

- **Desktop (>768px)**: Menú horizontal tradicional
- **Móvil (≤768px)**: Menú hamburguesa con animaciones

## 🎨 Características de Diseño

### 🌈 **Paleta de Colores**

- **Verde Pokémon**: `#359c4b` (navbar y botones)
- **Verde Claro**: `#1f8f37` (títulos)
- **Fondo**: Pattern de Pokébolas
- **Overlays**: Transparencias para mejor legibilidad

## 👨‍💻 Autor

**Matías Morales**

- GitHub: [@matimorales721](https://github.com/matimorales721)
- Proyecto: Trabajo Práctico Final - React