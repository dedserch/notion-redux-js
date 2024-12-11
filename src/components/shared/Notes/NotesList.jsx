import React from "react"
import { NoteCard } from "./NoteCard"

export const NotesList = React.memo(({ notes, onDelete }) => {
  return (
    <div className="flex flex-col gap-5">
      {notes.map(note => (
        <NoteCard key={note.id} note={note} onDelete={onDelete} />
      ))}
    </div>
  )
})
