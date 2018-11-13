import * as C from '../constants';

export function getCoinList() {
  return (dispatch) => {
    dispatch({
      type: C.COIN_LIST + C.START
    });

    fetch(`https://min-api.cryptocompare.com/data/all/coinlist`)
    .then(res => {
      return res.json()
    })
    .then(response => dispatch({
      type: C.COIN_LIST + C.SUCCESS,
      payload: { response }
    }))
    .catch(error => {
      dispatch({
        type: C.COIN_LIST + C.FAIL,
        payload: { error }
      })
    })
  }
}
