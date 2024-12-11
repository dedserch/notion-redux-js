import * as actionTypes from "../../constants/actionNote.constant"

const INITIAL_STATE = {
  loading: false,
  notes: [],
  note: null,
  error: null,
}

export const noteReducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case actionTypes.FETCH_NOTES_START:
    case actionTypes.FETCH_NOTE_START:
      return { ...state, error: null, loading: true }
    case actionTypes.FETCH_NOTES_SUCCESS:
      return { ...state, notes: payload, loading: false }
    case actionTypes.FETCH_NOTE_SUCCESS:
      return { ...state, note: payload, loading: false }
    case actionTypes.FETCH_NOTES_ERROR:
    case actionTypes.FETCH_NOTE_ERROR:
      return { ...state, loading: false, error: payload }
    case actionTypes.ADD_NOTE:
      return {
        ...state,
        loading: false,
        notes: state.notes.some((note) => note.id === payload.id)
          ? state.notes
          : [...state.notes, payload]
      }
    case actionTypes.UPDATE_NOTE:
      return {
        ...state,
        loading: false,
        notes: state.notes.map((note) =>
          note.id === payload.id ? { ...note, ...payload } : note
        ),
      }
    case actionTypes.DELETE_NOTE:
      return {
        ...state,
        loading: false,
        notes: state.notes.filter((note) => note.id !== payload),
      }
    default:
      return state
  }
}
