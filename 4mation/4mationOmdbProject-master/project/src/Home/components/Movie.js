import React from 'react';
import PropTypes from 'prop-types';
import './movie.css';

const Movie = props => (
	<div className="movie">
		<img src= {props.movie.Poster} alt="Error when loading"/>
		<div>
			<h1>Name : {props.movie.Title}</h1>
      		<h2>Year : {props.movie.Year}</h2>
		</div>
	</div>
)

Movie.propTypes = {
	movie: PropTypes.object.isRequired
}

export default Movie;