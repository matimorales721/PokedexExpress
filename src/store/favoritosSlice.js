import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  favoritos: [],
};

const favoritosSlice = createSlice({
  name: "favoritos",
  initialState,
  reducers: {
    
    // Agregar un pokemon a favoritos
    addToFavoritos: (state, action) => {
      const pokemon = action.payload;
      const isAlreadyFavorito = state.favoritos.some((fav) => fav.id === pokemon.id);

      if (!isAlreadyFavorito) {
        console.log("Agregando a favoritos:", pokemon);
        
        // Mi elemento favorito
        const favorito = {
          id: pokemon.id,
          name: pokemon.name,
          sprite: pokemon.sprites?.other?.["official-artwork"]?.front_default || pokemon.sprites?.front_default,
        };

        state.favoritos.push(favorito);
      }
    },

    removeFromFavoritos: (state, action) => {
      const pokemonId = action.payload;

      // me quedo con los de id <> al que quiero eliminar
      state.favoritos = state.favoritos.filter((fav) => fav.id != pokemonId);
    },

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
