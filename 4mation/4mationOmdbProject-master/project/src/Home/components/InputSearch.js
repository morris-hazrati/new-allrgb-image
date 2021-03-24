import React from 'react';
import PropTypes from 'prop-types';
import './inputSearch.css';

const InputSearch = props => (
	<div>
		<form onSubmit = {e => {
			e.preventDefault();
			props.onSubmit();
			}}>
		    <input className="inputSearch" type="text" placeholder="search by name..." name="inputSearch" onChange={props.onChange}/>
		  	<button type="submit">search</button>
		</form>
	</div>
)

InputSearch.propTypes = {
	onSubmit: PropTypes.func.isRequired
}

export default InputSearch;