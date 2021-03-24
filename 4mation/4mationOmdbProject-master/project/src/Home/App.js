import React, { Component } from 'react';
import { Provider } from 'react-redux'; //Bindings from redux and React
import SearchForm from './containers/SearchForm/index';
import Movies from './containers/Movies/index'
import store from '../store.js';

class App extends Component {
  render() {
    return (
	  <Provider store={store}>	
	      	<SearchForm />
	      	<Movies />
      </Provider>
    );
  }
}

export default App;
