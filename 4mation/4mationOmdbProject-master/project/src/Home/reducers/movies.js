import generateReducer from '../../shared/utils/reducerHelper';
import * as types from '../constants/movies.js';

export const INITIAL_STATE = {
  loading: false,
  error: null,
  data: [],
};

const behaviors = {
  [types.GET_INITIAL_MOVIES](state) {
    return Object.assign({}, state, { loading: true});
  },
  [types.GET_INITIAL_MOVIES_SUCCESS](state, action) {
    return Object.assign({}, state, { loading: false, data: action.data, error: null });
  },
  [types.GET_INITIAL_MOVIES_FAILURE](state, action) {
    return Object.assign({}, state, { loading: false, error: action.error });
  },
  [types.GET_MOVIE](state) {
    return Object.assign({}, state, { loading: true});
  },
  [types.GET_MOVIE_SUCCESS](state, action) {
    return Object.assign({}, state, { loading: false, data: action.data, error: null });
  },
  [types.GET_MOVIE_FAILURE](state, action) {
    return Object.assign({}, state, { loading: false, error: action.err, data: [] });
  }
};

export default generateReducer(INITIAL_STATE, behaviors);