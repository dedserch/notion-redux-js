import * as actionTypes from "../../constants/actionNote.constant"
import { NoteService } from "../../services/NoteService"

export const fetchNotes = () => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_NOTES_START })
  NoteService.getAll()
    .then((notes) => {
      dispatch({ type: actionTypes.FETCH_NOTES_SUCCESS, payload: notes })
    })
    .catch((error) => {
      dispatch({ type: actionTypes.FETCH_NOTES_ERROR, payload: error })
    })
}

export const fetchNote = (id) => (dispatch) => {
  dispatch({ type: actionTypes.FETCH_NOTE_START })
  NoteService.findById(id)
    .then((note) => {
      dispatch({ type: actionTypes.FETCH_NOTE_SUCCESS, payload: note })
    })
    .catch((error) => {
      dispatch({ type: actionTypes.FETCH_NOTE_ERROR, payload: error })
    })
}

export const createNote = (note) => (dispatch) => {
  NoteService.create(note)
    .then((newNote) => {
      dispatch({ type: actionTypes.ADD_NOTE, payload: newNote })
    })
    .catch((error) => {
      dispatch({ type: actionTypes.FETCH_NOTES_ERROR, payload: error })
    })
}

export const editNote = (id, updatedNote) => (dispatch) => {
  NoteService.update(id, updatedNote)
    .then((note) => {
      dispatch({ type: actionTypes.UPDATE_NOTE, payload: note })
    })
    .catch((error) => {
      dispatch({ type: actionTypes.FETCH_NOTES_ERROR, payload: error })
    })
}

export const removeNote = (id) => (dispatch) => {
  NoteService.delete(id)
    .then(() => {
      dispatch({ type: actionTypes.DELETE_NOTE, payload: id })
    })
    .catch((error) => {
      dispatch({ type: actionTypes.FETCH_NOTES_ERROR, payload: error })
    })
}
