import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { Form } from 'reactstrap';

import InputGroupText from '../../components/InputGroupText';

function UserSearchForm(props) {
  const { handleSubmit } = props;

  return (
    <Form onSubmit={handleSubmit}>
      <Field
        label="Search twitter"
        name="username"
        component={InputGroupText}
        noValidation
      />
    </Form>
  );
}

export default reduxForm({})(UserSearchForm);