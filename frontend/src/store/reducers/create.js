import {
  CREATE_CAR_NUMBER_PLATE_INIT,
  CREATE_CAR_NUMBER_PLATE_START,
  CREATE_CAR_NUMBER_PLATE_SUCCESS,
  CREATE_CAR_NUMBER_PLATE_FAIL
} from "../actions/actionTypes";
import { updateObject } from '../utility';

const initialState = {
  creating: false,
  created: false,
  error: null
};

const createInit = state => updateObject(state, {
  creating: false,
  created: false,
  error: null
});

const createStart = state => updateObject(state, {
  creating: true,
  error: null
});

const createSuccess = state => updateObject(state, {
  creating: false,
  created: true,
});

const createFail = (state, action) => updateObject(state, {
  creating: false,
  error: action.error
});

const reducer = ( state = initialState, action ) => {
  switch ( action.type ) {
    case CREATE_CAR_NUMBER_PLATE_INIT:
      return createInit(state);
    case CREATE_CAR_NUMBER_PLATE_START:
      return createStart(state);
    case CREATE_CAR_NUMBER_PLATE_SUCCESS:
      return createSuccess(state);
    case CREATE_CAR_NUMBER_PLATE_FAIL:
      return createFail(state, action);
    default:
      return state;
  }
};

export default reducer;