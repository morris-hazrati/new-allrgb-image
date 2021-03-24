export default {
  SET_USER_TOKEN: 'SET_USER_TOKEN',
  setUserToken(data) {
    return {
      type: this.SET_USER_TOKEN,
      payload: data
    };
  }
}