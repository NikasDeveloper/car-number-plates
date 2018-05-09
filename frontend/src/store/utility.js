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