import * as actionTypes from './actionTypes';
import { handleFetchError } from '../utility';

export const modifyCarNumberPlateInit = () => ({ type: actionTypes.MODIFY_CAR_NUMBER_PLATE_INIT });

const fetchCarNumberPlateStart = () => ({ type: actionTypes.FETCH_CAR_NUMBER_PLATE_START });

const fetchCarNumberPlateSuccess = carNumberPlate => ({
  type: actionTypes.FETCH_CAR_NUMBER_PLATE_SUCCESS,
  carNumberPlate
});

export const fetchCarNumberPlateFail = error => ({
  type: actionTypes.FETCH_CAR_NUMBER_PLATE_FAIL,
  error
});

export const fetchCarNumberPlate = id => dispatch => {
  dispatch(fetchCarNumberPlateStart());
  fetch(`/api/car-number-plates/${id}`)
    .then(handleFetchError)
    .then(response => response.json())
    .then(json => dispatch(fetchCarNumberPlateSuccess(json.carNumberPlate)))
    .catch(error => error
      .json()
      .then(json => dispatch(fetchCarNumberPlateFail(json)))
    );
};

const deleteCarNumberPlateStart = () => ({ type: actionTypes.DELETE_CAR_NUMBER_PLATE_START });

const deleteCarNumberPlateSuccess = () => ({ type: actionTypes.DELETE_CAR_NUMBER_PLATE_SUCCESS });

const deleteCarNumberPlateFail = error => ({
  type: actionTypes.DELETE_CAR_NUMBER_PLATE_FAIL,
  error
});

export const deleteCarNumberPlate = id => dispatch => {
  dispatch(deleteCarNumberPlateStart());
  fetch(`/api/car-number-plates/${id}`, { method: 'DELETE' })
    .then(handleFetchError)
    .then(() => dispatch(deleteCarNumberPlateSuccess()))
    .catch(error => error
      .json()
      .then(json => dispatch(deleteCarNumberPlateFail(json)))
    );
};