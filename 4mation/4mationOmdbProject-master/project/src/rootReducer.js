import {combineReducers} from 'redux';
import movies from './Home/reducers/movies';

const reducers = {
	movies
}

export default combineReducers(reducers);