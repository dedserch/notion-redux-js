import React, { useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../components/ui/Button"
import { selectNote } from "../../redux/note/selectors"
import { fetchNote, removeNote } from "../../redux/note/action"


export const Note = () => {
  const { noteId } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const note = useSelector((state) => selectNote(state))

  useEffect(() => {
    if (noteId) {
      dispatch(fetchNote(noteId))
    }
  }, [noteId, dispatch])

  const handleDelete = () => {
    if (note && note.id) {
      dispatch(removeNote(note.id))
      navigate("/notes")
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 py-8">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <Button name="← Back" onClick={() => navigate("/notes")} />
        </div>
        {note ? (
          <>
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold">{note.title}</h1>
              <div className="flex space-x-2">
                <Button
                  name="✍️ Edit"
                  onClick={() => navigate(`/notes/edit/${note.id}`)}
                />
                <Button name="🗑️ Delete" onClick={handleDelete} />
              </div>
            </div>
            <pre className="whitespace-pre-wrap break-words text-gray-700 text-lg">
              {note.body}
            </pre>
          </>
        ) : (
          <p>Loading note...</p>
        )}
      </div>
    </div>
  )
}
