import {
  FETCH_CAR_NUMBER_PLATE_FAIL,
  FETCH_CAR_NUMBER_PLATE_INIT,
  FETCH_CAR_NUMBER_PLATE_START,
  FETCH_CAR_NUMBER_PLATE_SUCCESS
} from './actionTypes';

export const fetchCarNumberPlateInit = () => {
  return { type: FETCH_CAR_NUMBER_PLATE_INIT };
};

export const fetchCarNumberPlateStart = () => {
  return { type: FETCH_CAR_NUMBER_PLATE_START };
};

export const fetchCarNumberPlateSuccess = carNumberPlate => {
  return {
    type: FETCH_CAR_NUMBER_PLATE_SUCCESS,
    carNumberPlate
  };
};

export const fetchCarNumberPlateFail = error => {
  return {
    type: FETCH_CAR_NUMBER_PLATE_FAIL,
    error
  };
};

export const fetchCarNumberPlate = id => dispatch => {
  dispatch(fetchCarNumberPlateStart());
  fetch(`/api/car-number-plates/${id}`)
    .then(response => Promise.all([ response, response.json() ]))
    .then(( [ response, json ] ) => {
      if ( response.status === 200 ) dispatch(fetchCarNumberPlateSuccess(json.carNumberPlate));
      else dispatch(fetchCarNumberPlateFail(json.message));
    });
};