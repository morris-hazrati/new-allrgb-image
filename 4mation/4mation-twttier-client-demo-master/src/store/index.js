import { createStore as create, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user']
};

const persistedReducer = persistReducer(persistConfig, reducers);

const logger = createLogger({
  collapsed: true,
  logger: console,
  stateTransformer: (state) => {
    return Object.assign({}, state);
  },
  predicate: (getState, { type }) => {
    return !type.startsWith('@@redux-form/');
  },
});

const middlewares = [];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}

export function createStore(initialState) {
  const store = create(persistedReducer, initialState, applyMiddleware(...middlewares));
  const persistor = persistStore(store);
  return { store, persistor };
}