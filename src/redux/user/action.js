import * as actionTypes from "../../constants/actionUser.constant"
import { AuthService } from "../../services/AuthService"

export const login =
  ({ email, password }) =>
  (dispatch) => {
    dispatch({ type: actionTypes.FETCH_START })
    AuthService.login({ email, password })
      .then((user) => {
        localStorage.setItem("userId", user.id)
        dispatch({ type: actionTypes.FETCH_SUCCESS, payload: user })
      })
      .catch((error) => {
        dispatch({ type: actionTypes.FETCH_ERROR, payload: error })
      })
  }

export const register = (user) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_START })
  AuthService.register(user)
    .then((newUser) => {
      localStorage.setItem("userId", newUser.id)
      dispatch({ type: actionTypes.FETCH_SUCCESS, payload: newUser })
    })
    .catch((error) => {
      dispatch({ type: actionTypes.FETCH_ERROR, payload: error })
    })
}

export const logout = () => (dispatch) => {
  AuthService.logout()
  localStorage.removeItem("userId")
  dispatch({ type: actionTypes.SET_USER, payload: null })
}
