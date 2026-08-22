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
    getDefaultFilter,
    getYoutubeEmbedUrl
}


function query(filterBy = {}) {
    return storageService.query(NOTE_KEY)
        .then(notes => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                notes = notes.filter(note => regExp.test(note.info.txt))
            }

            if (filterBy.type) {
                notes = notes.filter(note => note.type === filterBy.type)
            }

            notes.sort((note1, note2) => {
                if (note1.isPinned && !note2.isPinned) return -1
                if (!note1.isPinned && note2.isPinned) return 1

                if (note1.isPinned && note2.isPinned) {
                    return (note2.pinnedAt || 0) - (note1.pinnedAt || 0)
                }
                return note2.createdAt - note1.createdAt
            })
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

    if (notes && notes.length) return

    notes = []

    const demoNotes = [
        {
            type: 'NoteVideo',
            info: {
                txt: 'Argentina & Messi 🇦🇷⚽\nSome of the best goals and unforgettable moments.\nWatching Messi in the national team never gets old 💙🤍',
                url: 'XvIkS9fU2tc'
            },
            style: {
                backgroundColor: '#D4E4ED'
            },
            isPinned: false
        },

        {
            type: 'NoteTxt',
            info: {
                txt: 'Small steps every day add up to big results ✨'
            },
            style: {
                backgroundColor: '#F39F76',
            },
            isPinned: false
        },
        {
            type: 'NoteTodos',
            info: {
                txt: 'Weekend plans',
                todos: [
                    { txt: 'Go for a walk', isDone: true },
                    { txt: 'Buy groceries', isDone: false },
                    { txt: 'Watch a movie', isDone: false }
                ]
            },
            style: {
                backgroundColor: '#E9E3D4'
            },
            isPinned: false
        },

        {
            type: 'NoteTodos',
            info: {
                txt: 'Morning routine ☀️',
                todos: [
                    { txt: 'Drink water', isDone: true },
                    { txt: 'Make coffee ☕', isDone: true },
                    { txt: 'Check today’s tasks', isDone: false },
                    { txt: 'Go outside for 10 minutes', isDone: false }
                ]
            },
            style: {
                backgroundColor: '#E2F6D3'
            },
            isPinned: false
        },


        {
            type: 'NoteImg',
            info: {
                txt: 'Patagonia is definitely on the list 🇦🇷🏔️\nOne day...',
                url: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'
            },
            style: {
                backgroundColor: '#B4DDD3'
            },
            isPinned: false
        },


        {
            type: 'NoteTxt',
            info: {
                txt: 'Argentina mood 🇦🇷💙\nMate 🧉\nFootball ⚽\nMessi 🐐\nAnd pretending every match is not going to take ten years off my life 😅'
            },
            style: {
                backgroundColor: '#FFF8B8'
            },
            isPinned: false
        },
        {
            type: 'NoteVideo',
            info: {
                txt: 'JavaScript refresher',
                url: 'https://www.youtube.com/watch?v=PkZNo7MFNFg'
            },
            style: {
                backgroundColor: '#D4E4ED'
            },
            isPinned: false
        },
        {

            type: 'NoteTxt',
            info: {
                txt: 'Call Mom ❤️'
            },
            style: {
                backgroundColor: '#faafa8'
            },
            isPinned: false
        },


        {

            type: 'NoteTodos',
            info: {
                txt: 'Groceries',
                todos: [
                    { txt: 'Milk', isDone: false },
                    { txt: 'Eggs', isDone: true },
                    { txt: 'Coffee', isDone: false },
                    { txt: 'Pasta', isDone: false }
                ]
            },
            style: {
                backgroundColor: '#f6e2dd'
            },
            isPinned: false
        },

        {

            type: 'NoteTxt',
            style: {
                backgroundColor: '#e9e3d4'
            },
            info: {
                txt: 'Remember to take a break ☕'
            },
            isPinned: false,
        },
        {

            type: 'NoteVideo',
            info: {
                txt: 'Ideas for the trip',
                url: 'https://www.youtube.com/watch?v=oWCgGPVMkwA'
            },
            style: {
                backgroundColor: '#D3BFDB'
            },
            isPinned: false
        },

        {
            type: 'NoteTxt',
            info: {
                txt: '✨ Things I want to remember:\nBe curious, ask questions, take breaks, and don’t be afraid to try again. Progress does not have to be perfect to be meaningful.'
            },
            style: {
                backgroundColor: '#FFF8B8'
            },
            isPinned: false
        },
        {
            type: 'NoteImg',
            info: {
                txt: 'Dreaming about the next adventure 🌊',
                url: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e'
            },
            style: {
                backgroundColor: '#D4E4ED'
            },
            isPinned: false
        },


        {
            type: 'NoteImg',
            info: {
                txt: 'Slow mornings 🌿☕',
                url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085'
            },
            style: {
                backgroundColor: '#F6E2DD'
            },
            isPinned: false
        },
        {
            type: 'NoteVideo',
            info: {
                txt: 'YouTube API demo 🎬',
                url: 'https://youtu.be/M7lc1UVf-VE'
            },
            style: {
                backgroundColor: '#B4DDD3'
            },
            isPinned: false
        },
        {
            type: 'NoteTodos',
            info: {
                txt: 'Trip packing list ✈️',
                todos: [
                    { txt: 'Passport', isDone: true },
                    { txt: 'Phone charger', isDone: false },
                    { txt: 'Headphones 🎧', isDone: false },
                    { txt: 'Sunglasses 😎', isDone: true },
                    { txt: 'Camera', isDone: false }
                ]
            },
            style: {
                backgroundColor: '#ffffff'
            },
            isPinned: false
        },

        {
            type: 'NoteVideo',
            info: {
                txt: 'Animation break 🍿',
                url: 'https://www.youtube.com/watch?v=aqz-KE-bpKQ'
            },
            style: {
                backgroundColor: '#FAafa8'
            },
            isPinned: false
        },
        {
            type: 'NoteTxt',
            info: {
                txt: 'Reminder 📌\n\nNot everything needs to be done today.\nPick the three most important things, finish those first, and leave some room for unexpected things.\n\nAlso: buy chocolate 🍫'
            },
            style: {
                backgroundColor: '#D4E4ED'
            },
            isPinned: false
        },
        {
            type: 'NoteImg',
            info: {
                txt: 'Leo Messi the GOAT🐐⚽\nThere will never be another one like him ✨',
                url: 'assets/imgs/messi.jpg'
            },
            style: {
                backgroundColor: '#FFFFFF'
            },
            isPinned: false
        },

        {
            type: 'NoteImg',
            info: {
                txt: 'How can anyone say no to this face? 🐶🌷',
                url: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&w=1600&q=80'
            },
            style: {
                backgroundColor: '#F6E2DD'
            },
            isPinned: false
        },
        {
            type: 'NoteTodos',
            info: {
                txt: 'Easy pasta recipe 🍝',
                todos: [
                    { txt: 'Boil the pasta', isDone: true },
                    { txt: 'Chop garlic and tomatoes', isDone: true },
                    { txt: 'Add olive oil and basil 🌿', isDone: false },
                    { txt: 'Mix everything together', isDone: false },
                    { txt: 'Add parmesan and enjoy 😋', isDone: false }
                ]
            },
            style: {
                backgroundColor: '#FFF8B8'
            },
            isPinned: false
        },
        {
            type: 'NoteTxt',
            info: {
                txt: 'Travel wishlist ✈️\nPatagonia \nDolomites 🇮🇹\nSwiss Alps 🇨🇭\nIceland 🇮🇸\nSomewhere with mountains, a lake and absolutely no notifications 😌'
            },
            style: {
                backgroundColor: '#D3BFDB'
            },
            isPinned: false
        },

        {
            type: 'NoteTodos',
            info: {
                txt: 'Argentina Champions🩵🤍⚽',
                todos: [
                    { txt: 'Copa América 2021 🏆', isDone: true },
                    { txt: 'Finalissima 2022 🏆', isDone: true },
                    { txt: 'FIFA World Cup 2022 ⭐⭐⭐', isDone: true },
                    { txt: 'Copa América 2024 🏆', isDone: true }
                ]
            },
            style: {
                backgroundColor: '#ffffff'
            },
            isPinned: false
        },
        {
            type: 'NoteImg',
            info: {
                txt: 'Dinner inspiration for tonight 🍝✨',
                url: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601'
            },
            style: {
                backgroundColor: '#E9E3D4'
            },
            isPinned: false
        },
        {
            type: 'NoteImg',
            info: {
                txt: 'Places I would rather be right now 🏔️🌿',
                url: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&w=1600&q=80'
            },
            style: {
                backgroundColor: '#B4DDD3'
            },
            isPinned: false
        }


    ]

    for (let i = 0; i < demoNotes.length; i++) {
        notes.push(_createNote(demoNotes[i], i))
    }

    utilService.saveToStorage(NOTE_KEY, notes)
}


function _createNote(noteData, idx) {
    const note = getEmptyNote()

    note.id = utilService.makeId()
    note.createdAt = utilService.getCurrentTimestamp() - idx * 1000
    note.type = noteData.type
    note.info = noteData.info
    note.isPinned = noteData.isPinned
    note.pinnedAt = noteData.isPinned
        ? utilService.getCurrentTimestamp() - idx * 1000
        : null
    note.style.backgroundColor = noteData.style.backgroundColor
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
function getYoutubeEmbedUrl(url) {
    let videoId

    if (url.includes('youtu.be/')) {
        videoId = url.split('youtu.be/')[1].split('?')[0]

    } else if (url.includes('v=')) {
        videoId = url.split('v=')[1].split('&')[0]

    } else if (/^[a-zA-Z0-9_-]{11}$/.test(url)) {
        videoId = url
    }

    if (!videoId) return ''

    return `https://www.youtube.com/embed/${videoId}`
}