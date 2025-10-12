import { createSlice } from "@reduxjs/toolkit";

// Estado inicial de favoritos
const initialState = {
  favoritos: [], // Array de objetos pokemon favoritos
};

// Slice de favoritos con reducers
const favoritosSlice = createSlice({
  name: "favoritos",
  initialState,
  reducers: {
    // Agregar un pokemon a favoritos
    addToFavoritos: (state, action) => {
      const pokemon = action.payload;
      // Verificar que no esté ya en favoritos
      const isAlreadyFavorito = state.favoritos.some((fav) => fav.id === pokemon.id);

      if (!isAlreadyFavorito) {
        console.log("Agregando a favoritos:", pokemon);
        state.favoritos.push({
          id: pokemon.id,
          name: pokemon.name,
          sprite: pokemon.sprites?.other?.["official-artwork"]?.front_default || pokemon.sprites?.front_default,
        });
      }
    },

    // Quitar un pokemon de favoritos
    removeFromFavoritos: (state, action) => {
      const pokemonId = action.payload;
      state.favoritos = state.favoritos.filter((fav) => fav.id != pokemonId);
    },

    // Limpiar todos los favoritos
    clearFavoritos: (state) => {
      state.favoritos = [];
    },

    // Cargar favoritos desde localStorage
    loadFavoritosFromStorage: (state, action) => {
      state.favoritos = action.payload || [];
    },
  },
});

// Exportar acciones
export const { addToFavoritos, removeFromFavoritos, clearFavoritos, loadFavoritosFromStorage } = favoritosSlice.actions;

// Selectores para acceder al estado
export const selectFavoritos = (state) => state.favoritos.favoritos;
export const selectIsFavorito = (state, pokemonName) =>
  state.favoritos.favoritos.some((fav) => fav.name === pokemonName);
export const selectFavoritosCount = (state) => state.favoritos.favoritos.length;

// Exportar el reducer
export default favoritosSlice.reducer;
