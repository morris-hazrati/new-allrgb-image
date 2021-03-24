import React, { Component } from 'react';
import { Provider } from 'react-redux'; //Bindings from redux and React
import SearchForm from './SearchForm/index';
import Movies from './Movies/index'
import store from '../store.js';
import './App.css';

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
