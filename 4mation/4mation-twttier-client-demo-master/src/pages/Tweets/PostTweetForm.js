import React from 'react';
import {
  Form,
  Button
} from 'reactstrap';
import { reduxForm, Field } from 'redux-form';

import InputGroupText from '../../components/InputGroupText';

function PostTweetForm(props) {
  const { handleSubmit, invalid } = props;
  return (
    <Form onSubmit={handleSubmit} className="mb-3">
      <Field
        name="text"
        component={InputGroupText}
        label="Status"
        noValidation
      />
      <div className="text-right">
        <Button color="info" disabled={invalid}>Tweet</Button>
      </div>
    </Form>
  );
}

function validate(values) {
  const errors = {};

  if (!values.text) {
    errors.text = 'Required';
  }
  return errors;
}

export default reduxForm({ validate })(PostTweetForm);