import {
  FETCH_CAR_NUMBER_PLATE_FAIL,
  FETCH_CAR_NUMBER_PLATE_INIT,
  FETCH_CAR_NUMBER_PLATE_START,
  FETCH_CAR_NUMBER_PLATE_SUCCESS
} from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  carNumberPlate: null,
  loading: false,
  error: null
};

const fetchCarNumberPlateInit = state => updateObject(state, {
  carNumberPlate: null,
  error: null,
  loading: false
});

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

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case FETCH_CAR_NUMBER_PLATE_INIT:
      return fetchCarNumberPlateInit(state);
    case FETCH_CAR_NUMBER_PLATE_START:
      return fetchCarNumberPlateStart(state);
    case FETCH_CAR_NUMBER_PLATE_SUCCESS:
      return fetchCarNumberPlateSuccess(state, action);
    case FETCH_CAR_NUMBER_PLATE_FAIL:
      return fetchCarNumberPlateFail(state, action);
    default:
      return state;
  }
};

export default reducer;