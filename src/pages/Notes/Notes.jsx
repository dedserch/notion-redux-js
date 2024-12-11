import React, { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Button } from "../../components/ui/Button"
import { NotesList } from "../../components/shared/Notes/NotesList"
import { selectAllNotes } from "../../redux/note/selectors"
import { selectUser } from "../../redux/user/selectors"
import { fetchNotes, removeNote } from "../../redux/note/action"

export const Notes = () => {
  const dispatch = useDispatch()
  const user = useSelector(selectUser)

  
  useEffect(() => {
    if (user?.id) {
      dispatch(fetchNotes(user.id))
    }
  }, [dispatch])

  const notes = useSelector(selectAllNotes)

  const handleDelete = (id) => {
    dispatch(removeNote(id))
  }

  return (
    <div className="flex flex-col items-center bg-gray-100 py-8">
      <div className="w-full bg-white p-8 rounded-lg shadow-xl">
        <div className="flex justify-center mb-6">
          <Link to="/notes/create">
            <Button name="Create New Note" />
          </Link>
        </div>
        <h2 className="text-3xl font-bold text-center mb-6">Your Notes</h2>
        <NotesList notes={notes} onDelete={handleDelete} />
      </div>
    </div>
  )
}
