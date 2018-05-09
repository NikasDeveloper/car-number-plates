import * as actionTypes from './actionTypes';
import { handleFetchError } from '../utility';

export const createInit = () => ({ type: actionTypes.CREATE_CAR_NUMBER_PLATE_INIT });

const createStart = () => ({ type: actionTypes.CREATE_CAR_NUMBER_PLATE_START });

const createSuccess = () => ({ type: actionTypes.CREATE_CAR_NUMBER_PLATE_SUCCESS });

const createFail = error => ({
  type: actionTypes.CREATE_CAR_NUMBER_PLATE_FAIL,
  error
});

export const create = carNumberPlate => dispatch => {
  dispatch(createStart());
  fetch(`/api/car-number-plates/`, {
    method: 'POST',
    body: JSON.stringify(carNumberPlate),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(handleFetchError)
    .then(() => dispatch(createSuccess()))
    .catch(error => error
      .json()
      .then(json => dispatch(createFail(json)))
    );
};