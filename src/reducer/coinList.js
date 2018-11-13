import * as C from '../constants';

const defaultState = {
  data: {},
  isLoading: false
 }

export default (state = defaultState, action) => {
  const {type, payload} = action;
  switch (type) {
    case C.COIN_LIST + C.START: return {...state, isLoading: true}
    case C.COIN_LIST + C.SUCCESS: return {...state, data: payload.response.Data, isLoading: false}
  }

  return state
}
