import React from "react"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { Button } from "../../ui/Button"
import { formatDate } from "../../../utils/formatDate"
import { removeNote } from "../../../redux/note/action"

export const NoteCard = ({ note }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleEdit = (event) => {
    event.stopPropagation()
    navigate(`/notes/edit/${note.id}`)
  }

  const handleDelete = (event) => {
    event.stopPropagation()
    dispatch(removeNote(note.id))
  }

  const handleNavigateToNote = () => {
    navigate(`/notes/${note.id}`)
  }

  const formattedDate = formatDate(note.createdAt)

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 flex justify-between items-center cursor-pointer hover:bg-gray-100 transition"
      onClick={handleNavigateToNote}
    >
      <div>
        <h3 className="text-xl font-bold">{note.title}</h3>
        <p className="text-gray-500">{formattedDate}</p>
      </div>
      <div className="flex items-center space-x-2">
        <Button name="✍️ Edit" onClick={handleEdit} />
        <Button name="🗑️ Delete" onClick={handleDelete} />
      </div>
    </div>
  )
}
