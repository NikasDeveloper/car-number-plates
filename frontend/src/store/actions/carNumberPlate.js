import * as actionTypes from './actionTypes';
import { handleFetchError } from '../utility';

const fetchCarNumberPlateStart = () => ({ type: actionTypes.FETCH_CAR_NUMBER_PLATE_START });

const fetchCarNumberPlateSuccess = carNumberPlate => ({
  type: actionTypes.FETCH_CAR_NUMBER_PLATE_SUCCESS,
  carNumberPlate
});

const fetchCarNumberPlateFail = error => ({
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

export const modifyCarNumberPlateInit = () => ({ type: actionTypes.MODIFY_CAR_NUMBER_PLATE_INIT });

const modifyCarNumberPlateStart = () => ({ type: actionTypes.MODIFY_CAR_NUMBER_PLATE_START });

const modifyCarNumberPlateSuccess = () => ({ type: actionTypes.MODIFY_CAR_NUMBER_PLATE_SUCCESS });

const modifyCarNumberPlateFail = () => ({ type: actionTypes.MODIFY_CAR_NUMBER_PLATE_FAIL });

export const deleteCarNumberPlate = id => dispatch => {
  dispatch(modifyCarNumberPlateStart());
  fetch(`/api/car-number-plates/${id}`, { method: 'DELETE' })
    .then(handleFetchError)
    .then(() => dispatch(modifyCarNumberPlateSuccess()))
    .catch(error => error
      .json()
      .then(json => dispatch(modifyCarNumberPlateFail(json)))
    );
};

export const updateCarNumberPlate = ( id, carNumberPlate ) => dispatch => {
  dispatch(modifyCarNumberPlateStart());
  fetch(`/api/car-number-plates/${id}`, {
    method: 'PUT',
    body: JSON.stringify(carNumberPlate),
    headers: new Headers({
      'Content-Type': 'application/json'
    })
  }).then(handleFetchError)
    .then(() => dispatch(modifyCarNumberPlateSuccess()))
    .catch(error => error
      .json()
      .then(json => dispatch(modifyCarNumberPlateFail(json)))
    );
};