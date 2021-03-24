import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Movie from '../../components/Movie';
import ErrorComponent from '../../../shared/components/Error/ErrorComponent';
import * as moviesActions from '../../actions/movies';
import './style.css'

class Movies extends React.Component {
	
	componentDidMount() {
		this.props.getInitialMovies();
	}
	
	render() {
		const initialMovies = (!this.props.loading && this.props.movies.length == 0 && !this.props.error) ? <p>Loading...</p>
		: this.props.movies.map((movie,i) =>
			<Movie movie = {movie} key = {i}></Movie>)
		return (
			<div className="movies">
				<ErrorComponent error={this.props.error} />
				{initialMovies}
			</div>
		);
	}
}

Movies.propTypes = {
	getInitialMovies: PropTypes.func.isRequired,
	loading: PropTypes.bool.isRequired,
	movies: PropTypes.array.isRequired,
	error: PropTypes.string,
}

const mapStateToProps = state => (
	{
		loading: state.movies.loading,
		error: state.movies.error,
		movies : state.movies.data
	}
)

const mapDispatchToProps = dispatch => bindActionCreators(moviesActions, dispatch);


export default connect(mapStateToProps, mapDispatchToProps)(Movies);