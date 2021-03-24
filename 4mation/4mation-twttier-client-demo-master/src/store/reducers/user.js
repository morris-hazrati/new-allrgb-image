import actions from '../actions';

const { user } = actions;
// consider user is logged in only if accessToken object is presented
const INITIAL_STATE = {
  loading: false,
  // { requestToken, accessToken }
  data: null
};

export default (state = INITIAL_STATE, action = {}) => {
  switch(action.type) {
    case user.SET_USER_TOKEN:
      return Object.assign({}, state, {
        data: {
          ...state.data,
          ...action.payload
        }
      });
    default:
      return state;
  }
}