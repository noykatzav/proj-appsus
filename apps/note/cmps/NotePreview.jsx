import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'

export function NotePreview({ note }) {

    switch (note.type) {
        case 'NoteTxt':
            return <NoteTxt info={note.info} />

        case 'NoteImg':
            return <NoteImg info={note.info} />

        case 'NoteVideo':
            return <NoteVideo info={note.info} />

        default:
            return null

    }
}