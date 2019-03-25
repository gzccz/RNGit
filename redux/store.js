
import { createStore } from 'redux'
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage' //defaults to localStorage for web and AsyncStorage for react-native

import RootReducer from './reducers/index'

const persistConfig = {
    key: 'root',
    storage,
}
const persistedReducer = persistReducer(persistConfig, RootReducer)

export const store = createStore(persistedReducer);
export const persistor = persistStore(store);
