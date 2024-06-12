import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { useIntl } from '@edx/frontend-platform/i18n';
import PropTypes from 'prop-types';

import { FormGroup } from '../../../common-components';
import { clearRegistrationBackendError, fetchRealtimeValidations } from '../../data/actions';
import { cpfMask } from './utils';
import validateCPF from './validator';

/**
 * Name field wrapper. It accepts following handlers
 * - handleChange for setting value change and
 * - handleErrorChange for setting error
 *
 * It is responsible for
 * - Making backend call for generating username suggestions
 * - Performing name field validations
 * - Clearing error on focus
 * - Setting value on change
 */
const CPFField = (props) => {
  const { formatMessage } = useIntl();
  const dispatch = useDispatch();
  const validationApiRateLimited = useSelector(state => state.register.validationApiRateLimited);

  const {
    handleErrorChange,
  } = props;

  const handleOnBlur = (e) => {
    const { value } = e.target;
    const fieldError = validateCPF(value, formatMessage);
    if (fieldError) {
      handleErrorChange('cpf', fieldError);
    } else if (!validationApiRateLimited) {
      dispatch(fetchRealtimeValidations({ cpf: value }));
    }
  };

  const handleOnFocus = () => {
    handleErrorChange('cpf', '');
    dispatch(clearRegistrationBackendError('cpf'));
  };

  return (
    <FormGroup
      {...props}
      max={14}
      value={cpfMask(props.value)}
      handleBlur={handleOnBlur}
      handleFocus={handleOnFocus}
    />

  );
};

CPFField.defaultProps = {
  errorMessage: '',
};

CPFField.propTypes = {
  errorMessage: PropTypes.string,
  value: PropTypes.string.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleErrorChange: PropTypes.func.isRequired,
};

export default CPFField;
