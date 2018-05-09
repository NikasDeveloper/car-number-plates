export const updateObject = ( oldObject, updatedProperties ) => ({
  ...oldObject,
  ...updatedProperties
});

export const handleFetchError = response => {
  if ( !response.ok ) {
    throw response;
  }
  return response;
};

export const inputsFactory = () => ({
  firstName: {
    value: '',
    label: 'First name',
    placeholder: 'Owners first name...',
    required: true,
    error: '',
  },
  lastName: {
    value: '',
    label: 'Last name',
    placeholder: 'Owners last name...',
    required: true,
    error: '',
  },
  number: {
    value: '',
    label: 'number on car plate',
    placeholder: 'Car plate number...',
    required: true,
    error: '',
  }
});

export const bindInputErrors = (nextProps, prevState) => {
  const errors = nextProps.error.errors;
  const updatedState = { ...prevState };
  const updatedInputs = { ...updatedState.inputs };
  errors.forEach(e => {
    const updatedInput = { ...updatedInputs[ e.key ] };
    updatedInput.error = e.message;
    updatedInputs[ e.key ] = updatedInput;
  });
  return { inputs: updatedInputs };
};

export const bindCarNumberPlateToInputs = (nextProps, prevState) => {
  const updatedState = { ...prevState };
  const updatedInputs = { ...updatedState.inputs };
  updatedInputs.firstName = {
    ...updatedInputs.firstName,
    value: nextProps.carNumberPlate.owner.firstName
  };
  updatedInputs.lastName = {
    ...updatedInputs.lastName,
    value: nextProps.carNumberPlate.owner.lastName
  };
  updatedInputs.number = {
    ...updatedInputs.number,
    value: nextProps.carNumberPlate.number
  };
  return { inputs: updatedInputs, carNumberPlateFound: true };
};