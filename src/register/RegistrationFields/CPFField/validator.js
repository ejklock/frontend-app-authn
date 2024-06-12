import { cpf } from 'cpf-cnpj-validator';

import messages from '../../messages';

const validateCPF = (value, formatMessage) => {
  let fieldError = '';
  if (!value.trim()) {
    fieldError = formatMessage(messages['empty.cpf.field.error']);
  } else if (value && !cpf.isValid(value)) {
    fieldError = formatMessage(messages['cpf.validation.message']);
  }
  return fieldError;
};

export default validateCPF;
