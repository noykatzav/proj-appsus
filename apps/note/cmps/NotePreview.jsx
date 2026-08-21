import { NoteTxt } from './NoteTxt.jsx';

export function NotePreview({note}){

    switch(note.type){
case 'NoteTxt':
    return <NoteTxt info={note.info} />

    default:
        return null
        
    }
}