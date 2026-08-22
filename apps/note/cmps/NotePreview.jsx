import { NoteTxt } from './NoteTxt.jsx';
import { NoteImg } from './NoteImg.jsx'
import { NoteVideo } from './NoteVideo.jsx'
import { NoteTodos } from './NoteTodos.jsx'


export function NotePreview({ note, onToggleTodo }) {

    switch (note.type) {
        case 'NoteTxt':
            return <NoteTxt info={note.info} />

        case 'NoteImg':
            return <NoteImg info={note.info} />

        case 'NoteVideo':
            return <NoteVideo info={note.info} />

        case 'NoteTodos':
            return <NoteTodos info={note.info}  onToggleTodo={onToggleTodo}/>

        default:
            return null

    }
}