import {
  FETCH_CAR_NUMBER_PLATES_FAIL,
  FETCH_CAR_NUMBER_PLATES_INIT,
  FETCH_CAR_NUMBER_PLATES_START,
  FETCH_CAR_NUMBER_PLATES_SUCCESS
} from './actionTypes';
import { handleFetchError } from '../utility';

export const fetchCarNumberPlatesInit = () => {
  return { type: FETCH_CAR_NUMBER_PLATES_INIT };
};

export const fetchCarNumberPlatesStart = () => {
  return { type: FETCH_CAR_NUMBER_PLATES_START };
};

export const fetchCarNumberPlatesSuccess = carNumberPlates => {
  return {
    type: FETCH_CAR_NUMBER_PLATES_SUCCESS,
    carNumberPlates
  };
};

export const fetchCarNumberPlatesFail = error => {
  return {
    type: FETCH_CAR_NUMBER_PLATES_FAIL,
    error
  };
};

export const fetchCarNumberPlates = () => dispatch => {
  dispatch(fetchCarNumberPlatesStart());
  fetch('/api/car-number-plates')
    .then(handleFetchError)
    .then(response => response.json())
    .then(json => dispatch(fetchCarNumberPlatesSuccess(json.carNumberPlates)))
    .catch(error => error
      .json()
      .then(json => dispatch(fetchCarNumberPlatesFail(json)))
    );
};