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