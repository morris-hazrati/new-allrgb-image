import thunkMiddleware from 'redux-thunk';
import { createStore, applyMiddleware, compose } from 'redux';

import rooterReducer from './rootReducer';

const composeEnhancers = compose;
const store = createStore(rooterReducer, composeEnhancers(
		applyMiddleware(thunkMiddleware)))

export default store;
