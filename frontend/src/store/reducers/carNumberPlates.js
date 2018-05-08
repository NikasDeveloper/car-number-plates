import {
  FETCH_CAR_NUMBER_PLATES_FAIL,
  FETCH_CAR_NUMBER_PLATES_INIT,
  FETCH_CAR_NUMBER_PLATES_START,
  FETCH_CAR_NUMBER_PLATES_SUCCESS
} from '../actions/actionTypes';
import { updateObject } from '../utility';

const initialState = {
  carNumberPlates: [],
  loading: false,
  error: null
};

const fetchCarNumberPlatesInit = state => updateObject(state, {
  carNumberPlates: [],
  error: null,
  loading: false
});

const fetchCarNumberPlatesStart = state => updateObject(state, {
  carNumberPlates: [],
  error: null,
  loading: true
});

const fetchCarNumberPlatesSuccess = ( state, action ) => updateObject(state, {
  carNumberPlates: action.carNumberPlates,
  loading: false
});

const fetchCarNumberPlatesFail = ( state, action ) => updateObject(state, {
  error: action.error,
  loading: false
});

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case FETCH_CAR_NUMBER_PLATES_INIT:
      return fetchCarNumberPlatesInit(state);
    case FETCH_CAR_NUMBER_PLATES_START:
      return fetchCarNumberPlatesStart(state);
    case FETCH_CAR_NUMBER_PLATES_SUCCESS:
      return fetchCarNumberPlatesSuccess(state, action);
    case FETCH_CAR_NUMBER_PLATES_FAIL:
      return fetchCarNumberPlatesFail(state, action);
    default:
      return state;
  }
};

export default reducer;