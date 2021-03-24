import React from 'react';

const ErrorComponent = props => (
	props.error &&
	<div>
		<p>{props.error}</p>
	</div>
)

export default ErrorComponent;