import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  carNumberPlate: null,
  loading: false,
  modifying: false,
  modified: false,
  error: null
};

const fetchCarNumberPlateStart = state => updateObject(state, {
  carNumberPlate: null,
  error: null,
  loading: true
});

const fetchCarNumberPlateSuccess = ( state, action ) => updateObject(state, {
  carNumberPlate: action.carNumberPlate,
  loading: false
});

const fetchCarNumberPlateFail = ( state, action ) => updateObject(state, {
  error: action.error,
  loading: false
});


const modifyCarNumberPlateStart = state => updateObject(state, {
  error: null,
  modifying: true
});

const modifyCarNumberPlateInit = state => updateObject(state, {
  carNumberPlate: null,
  loading: false,
  modifying: false,
  modified: false,
  error: null
});

const modifyCarNumberPlateSuccess = state => updateObject(state, {
  modified: true,
  modifying: false
});

const modifyCarNumberPlateFail = ( state, action ) => updateObject(state, {
  error: action.error,
  modifying: false
});

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case actionTypes.FETCH_CAR_NUMBER_PLATE_START:
      return fetchCarNumberPlateStart(state);
    case actionTypes.FETCH_CAR_NUMBER_PLATE_SUCCESS:
      return fetchCarNumberPlateSuccess(state, action);
    case actionTypes.FETCH_CAR_NUMBER_PLATE_FAIL:
      return fetchCarNumberPlateFail(state, action);
    case actionTypes.MODIFY_CAR_NUMBER_PLATE_INIT:
      return modifyCarNumberPlateInit(state);
    case actionTypes.MODIFY_CAR_NUMBER_PLATE_START:
      return modifyCarNumberPlateStart(state);
    case actionTypes.MODIFY_CAR_NUMBER_PLATE_SUCCESS:
      return modifyCarNumberPlateSuccess(state);
    case actionTypes.MODIFY_CAR_NUMBER_PLATE_FAIL:
      return modifyCarNumberPlateFail(state, action);
    default:
      return state;
  }
};

export default reducer;