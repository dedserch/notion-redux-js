import { NoteForm } from "../../components/shared/NoteForm/NoteForm"

export const NoteCreate = () => {
    return(
        <div>
            <NoteForm isEdit={false} noteId={null}/>
        </div>
    )
}