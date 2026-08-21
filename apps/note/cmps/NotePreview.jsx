import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx'

export function NotePreview({ note }) {

    switch (note.type) {
        case 'NoteTxt':
            return <NoteTxt info={note.info} />

        case 'NoteImg':
            return <NoteImg info={note.info} />

        default:
            return null

    }
}