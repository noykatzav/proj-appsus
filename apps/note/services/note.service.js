// note service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'

_createNotes()

export const noteService = {
    query,
    getEmptyNote
}


function query() {
    return storageService.query(NOTE_KEY)
}


function getEmptyNote(txt = '') {
    return {

        id: '',
        createdAt: utilService.getCurrentTimestamp(),
        type: 'NoteTxt',
        isPinned: false,
        style: {
            backgroundColor: '#ffffff'
        },
        info: {
            txt: txt
        }
    }
}

function _createNotes() {
    let notes = utilService.loadFromStorage(NOTE_KEY)

    if (!notes || !notes.length) {
        notes = []
        const texts = ['Fullstack Me Baby!', 'Bobi and Me', 'Get my stuff together']

        for (let i = 0; i < texts.length; i++) {
            notes.push(_createNote(texts[i]))
        }
        utilService.saveToStorage(NOTE_KEY, notes)


    }
}

function _createNote(txt) {
    const note = getEmptyNote(txt)
    note.id = utilService.makeId()
    return note
}


// const notes = [
//     {
//         id: 'n101',
//         createdAt: 1112222,
//         type: 'NoteTxt',
//         isPinned: true,
//         style: {
//             backgroundColor: '#00d'
//         },
//         info: {
//             txt: 'Fullstack Me Baby!'
//         }
//     },
// ]

