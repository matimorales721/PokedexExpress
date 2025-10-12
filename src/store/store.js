import { configureStore } from "@reduxjs/toolkit";
import favoritosReducer from "./favoritosSlice";

// Configurar el store con middleware para localStorage
const store = configureStore({
  reducer: {
    favoritos: favoritosReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
      },
    }),
});

// Middleware personalizado para sincronizar con localStorage
store.subscribe(() => {
  const state = store.getState();
  try {
    localStorage.setItem("pokemonFavoritos", JSON.stringify(state.favoritos.favoritos));
  } catch (error) {
    console.warn("No se pudo guardar en localStorage:", error);
  }
});

// Cargar favoritos desde localStorage al inicializar
const loadFromStorage = () => {
  try {
    const saved = localStorage.getItem("pokemonFavoritos");
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.warn("No se pudo cargar desde localStorage:", error);
    return [];
  }
};

// Cargar favoritos guardados
const savedFavoritos = loadFromStorage();
if (savedFavoritos.length > 0) {
  store.dispatch({
    type: "favoritos/loadFavoritosFromStorage",
    payload: savedFavoritos,
  });
}

export default store;
