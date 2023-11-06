import { configureStore } from '@reduxjs/toolkit'
import {
  persistStore, persistReducer,
  PERSIST,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';



// Import the slice reducers here
import userSlice from '../slicers/userSlice.js';
import cartSlice from '../slicers/cartSlice.js';
import modalSlice from '../slicers/modalSlice.js';
import tablesSlice from '../slicers/tablesSlice.js';


const persistConfig = {
  cart: {
    key: 'cart',
    storage,
    version: 1,
    whitelist: ['products', 'value', 'quantity'],
  },
  user: {
    key: 'user',
    storage,
    version: 1,
    whitelist: ['user'],
  }
}

const persistedUserSlice = persistReducer(persistConfig.user, userSlice);
const persistedCartSlice = persistReducer(persistConfig.cart, cartSlice);

const store = configureStore({
  reducer: {
    user: persistedUserSlice,
    cart: persistedCartSlice,
    modal: modalSlice,
    tables: tablesSlice,
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
