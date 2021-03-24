import React from 'react';
import { reduxForm, Field } from 'redux-form';
import {
  Form,
  Button
} from 'reactstrap';

import InputGroupText from '../../components/InputGroupText';

function TweetSearchForm(props) {
  const { handleSubmit, invalid } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        name="q"
        component={InputGroupText}
        label="Tweet"
        noValidation
      />
      <div className="text-right">
        <Button color="info" type="submit" disabled={invalid}>Search</Button>
      </div>
    </Form>
  );
}

export default reduxForm({
  validate(values) {
    const errors = {};

    if (!values.q) {
      errors.q = 'Required';
    }

    return errors;
  }
})(TweetSearchForm);