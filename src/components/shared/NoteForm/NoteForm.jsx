import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../ui/Button"
import { Input } from "../../ui/Input"
import { TextArea } from "../../ui/TextArea"
import { ValidationService } from "../../../services/ValidationService"
import { fetchNote, createNote, editNote } from "../../../redux/note/action"
import {
  selectNote,
  selectLoadingNotes,
  selectErrorNote,
} from "../../../redux/note/selectors"
import { selectUser } from "../../../redux/user/selectors"

export const NoteForm = ({ isEdit, noteId }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [errors, setErrors] = useState({ title: "", description: "" })
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const note = useSelector(selectNote)
  const loading = useSelector(selectLoadingNotes)
  const error = useSelector(selectErrorNote)
  const user = useSelector(selectUser)

  const userId = user?.id

  useEffect(() => {
    if (isEdit && noteId && userId) {
      dispatch(fetchNote(noteId, userId))
    } else {
      setTitle("")
      setDescription("")
    }
  }, [isEdit, noteId, userId, dispatch])

  useEffect(() => {
    if (note && isEdit) {
      setTitle(note.title)
      setDescription(note.body)
    }
  }, [note, isEdit])

  useEffect(() => {
    if (isEdit && note && note.userId !== userId) {
      navigate("*")
    }
  }, [note, isEdit, userId, navigate])

  const validateForm = () => {
    const newErrors = { title: "", description: "" }
    let isValid = true

    if (!ValidationService.validateTitle(title)) {
      newErrors.title = "Title is required"
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) return

    const noteData = {
      title,
      body: description,
      userId,
    }

    try {
      if (isEdit && noteId) {
        await dispatch(editNote(noteId, noteData))
        navigate(`/notes`)
      } else {
        await dispatch(createNote(noteData))
        navigate(`/notes`)
      }
    } catch (error) {
      console.error("Error saving note:", error)
    }
  }

  return (
    <div className="min-h-screen flex items-center flex-col bg-gray-100 py-8">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-xl">
        <div className="mb-6 flex justify-start">
          <Button name="← Back" onClick={() => navigate("/notes")} />
        </div>
        <h2 className="text-3xl font-bold text-center mb-6">
          {isEdit ? "Edit Note" : "Create Note"}
        </h2>
        {loading && <div>Loading...</div>}
        {error && <div className="text-red-500">Error: {error}</div>}
        {!loading && (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700">Title</label>
              <Input
                name="title"
                type="text"
                value={title}
                placeholder="Enter the title of your note"
                onChange={(e) => setTitle(e.target.value)}
              />
              {errors.title && (
                <p className="text-red-500 text-sm">{errors.title}</p>
              )}
            </div>
            <div className="mb-4">
              <label className="block text-gray-700">
                Description (Optional)
              </label>
              <TextArea
                name="description"
                value={description}
                placeholder="Enter the body of your note"
                onChange={(e) => setDescription(e.target.value)}
              />
              {errors.description && (
                <p className="text-red-500 text-sm">{errors.description}</p>
              )}
            </div>
            <div className="flex justify-center mt-6">
              <Button name={isEdit ? "Edit" : "Create"} />
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
