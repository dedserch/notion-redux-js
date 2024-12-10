import { useParams } from "react-router-dom"
import { NoteForm } from "../../components/shared/NoteForm/NoteForm"

export const NoteEdit = () => {
    const { noteId } = useParams()
    return (
        <div>
            <NoteForm isEdit={true} noteId={noteId} />
        </div>
    )
}
