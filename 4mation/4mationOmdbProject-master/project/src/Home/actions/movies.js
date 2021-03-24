import * as actionTypes from '../constants/movies.js';
import axios from 'axios';

const getInitialMoviesAction = () => ({ type: actionTypes.GET_INITIAL_MOVIES });

const getInitialMoviesSuccess = data => ({
  type: actionTypes.GET_INITIAL_MOVIES_SUCCESS,
  data
})

const getInitialMoviesFailure = err => ({
  type: actionTypes.GET_INITIAL_MOVIES_FAILURE,
  err
})

const getMovieAction = () => ({ type: actionTypes.GET_MOVIE });

const getMovieSuccess = data => ({
  type: actionTypes.GET_MOVIE_SUCCESS,
  data
})

const getMovieFailure = err => ({
  type: actionTypes.GET_MOVIE_FAILURE,
  err
})

export function getMovieByTitle(title) {
  if(!title.length)
    return getInitialMovies();
  return (dispatch) => {
    dispatch(getMovieAction());
    return axios.get(`http://www.omdbapi.com/?apikey=20dac387&s=${title}`)
    .then(response => {
      if(response.data.Error) 
        return dispatch(getMovieFailure(response.data.Error)); 
      return dispatch(getMovieSuccess(response.data.Search));
    })
    .catch(err => dispatch(getMovieFailure(err)));
  };
}

export function getInitialMovies() {
  return (dispatch) => {
    dispatch(getInitialMoviesAction());
    return axios.get(`http://www.omdbapi.com/?apikey=20dac387&s=${'batman'}&y=2018`)
    .then(response => dispatch(getInitialMoviesSuccess(response.data.Search)))
    .catch(err => dispatch(getInitialMoviesFailure(err)));
  };
}
