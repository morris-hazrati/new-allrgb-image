import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { FormGroup, Label, Input, FormFeedback, FormText } from 'reactstrap';

function InputGroupText(props) {
  const { input, meta, label, helpText, noValidation } = props;
  const showError = meta.touched && meta.error;

  return (
    <FormGroup>
      <Label>{label}</Label>
      <Input
        {..._.omit(props, 'noValidation')}
        {...input}
        invalid={!noValidation && meta.touched && meta.invalid}
        valid={!noValidation && meta.touched && meta.valid}
      />
      {showError && <FormFeedback>{meta.error}</FormFeedback>}
      {helpText && <FormText>{helpText}</FormText>}
    </FormGroup>
  );
}

InputGroupText.propTypes = {
  children: PropTypes.node,
  // type can be things like text, password, (typical input types) as well as select and textarea, providing children as you normally would to those.
  type: PropTypes.string,
  size: PropTypes.string,
  bsSize: PropTypes.string,
  // state: deprecated(PropTypes.string, 'Please use the prop "valid"'),
  valid: PropTypes.bool, // applied the is-valid class when true, does nothing when false
  invalid: PropTypes.bool, // applied the is-invalid class when true, does nothing when false
  tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // ref will only get you a reference to the Input component, use innerRef to get a reference to the DOM input (for things like focus management).
  innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  // static: deprecated(PropTypes.bool, 'Please use the prop "plaintext"'),
  plaintext: PropTypes.bool,
  addon: PropTypes.bool,
  className: PropTypes.string,
  cssModule: PropTypes.object,

  label: PropTypes.string,
  noValidation: PropTypes.bool
};

export default InputGroupText;