import {
  FETCH_CAR_PLATE_NUMBERS_FAIL,
  FETCH_CAR_PLATE_NUMBERS_INIT,
  FETCH_CAR_PLATE_NUMBERS_START,
  FETCH_CAR_PLATE_NUMBERS_SUCCESS
} from './actionTypes';

export const fetchCarNumberPlatesInit = () => {
  return { type: FETCH_CAR_PLATE_NUMBERS_INIT };
};

export const fetchCarNumberPlatesStart = () => {
  return { type: FETCH_CAR_PLATE_NUMBERS_START };
};

export const fetchCarNumberPlatesSuccess = carNumberPlates => {
  return {
    type: FETCH_CAR_PLATE_NUMBERS_SUCCESS,
    carNumberPlates
  };
};

export const fetchCarNumberPlatesFail = error => {
  return {
    type: FETCH_CAR_PLATE_NUMBERS_FAIL,
    error
  };
};

export const fetchCarNumberPlates = () => {
  return dispatch => {
    dispatch(fetchCarNumberPlatesStart());
    fetch('/api/car-number-plates')
      .then(response => response.json())
      .then(json => {
        dispatch(fetchCarNumberPlatesSuccess(json.carNumberPlates));
      })
      .catch(error => {
        dispatch(fetchCarNumberPlatesFail(error));
      });
  }
};