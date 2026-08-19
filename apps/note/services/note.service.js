// note service
import { utilService } from '../../../services/util.service.js'
import { storageService } from '../../../services/async-storage.service.js'

const NOTE_KEY = 'noteDB'

_createNotes()

export const noteService = {
    query,
    get,
    save,
    remove,
    getEmptyNote,
    getDefaultFilter
}


function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.info.txt))
            }
            notes.sort((note1, note2) => note2.createdAt - note1.createdAt)
            return notes
        })
}

function get(noteId) {
    return storageService.get(NOTE_KEY, noteId)
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
        const texts = ['Fullstack Me Baby!', 'Bobi and Me', 'Get my stuff together Get my stuff together Get my stuff together']

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

function save(note) {
    if (note.id) {
        return storageService.put(NOTE_KEY, note)
    } else {
        return storageService.post(NOTE_KEY, note)
    }
}

function remove(noteId) {
    return storageService.remove(NOTE_KEY, noteId)
}

function getDefaultFilter() {
    return {
        txt: '',
        type: ''
    }
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

