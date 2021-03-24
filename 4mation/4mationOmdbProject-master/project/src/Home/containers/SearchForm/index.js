import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as searchActions from '../../actions/movies';
import InputSearch from '../../components/InputSearch';

class SearchForm extends React.Component {
	state = {
		inputValue: ''
	}

	handleChange = e => {
		this.setState({
			inputValue: e.target.value
		})
	}

	handleSubmit = () => {
		this.props.getMovieByTitle(this.state.inputValue);
	}

	render() {
		return (
			<div>
				<InputSearch 
					onChange={this.handleChange}
					onSubmit={this.handleSubmit}
				/>
			</div>
		);
	}
}

SearchForm.propTypes = {
	getMovieByTitle: PropTypes.func.isRequired
}

const mapDispatchToProps = dispatch => bindActionCreators(searchActions, dispatch);

export default connect(null, mapDispatchToProps)(SearchForm);