import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore, persistReducer, FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';



// Import the slice reducers here
import userSlice from '../slicers/userSlice.js';
import cartSlice from '../slicers/cartSlice.js';


const persistConfig = {
  key: 'root',
  storage,
  version: 1,
}

const persistedUserSlice = persistReducer(persistConfig, userSlice);
const persistedCartSlice = persistReducer(persistConfig, cartSlice);

const store = configureStore({
  reducer: {
    user: persistedUserSlice,
    cart: persistedCartSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST],
      }
    })
  }
})

const persistor = persistStore(store);

export { store, persistor }
