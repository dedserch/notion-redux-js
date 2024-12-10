import * as actionTypes from "../../constants/actionUser.constant"

const INITIAL_STATE = {
  loading: false,
  user: null,
  users: [],
  error: null,
}

export const userReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_START:
      return { ...state, loading: true, error: null }
    case actionTypes.FETCH_SUCCESS:
      return { ...state, user: payload, loading: false }
    case actionTypes.FETCH_ERROR:
      return { ...state, loading: false, error: payload }
    case actionTypes.SET_USER:
      return { ...state, user: payload }
    default:
      return state
  }
}
