const { useState, useEffect, useRef } = React
const { useParams, useNavigate } = ReactRouterDOM

import { noteService } from '../services/note.service.js'
import { NoteTodos } from './NoteTodos.jsx'

export function NoteEdit({ onSaveNote }) {
    const [note, setNote] = useState(null)
    const textAreaRef = useRef(null)

    const { noteId } = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadNote()
    }, [noteId])

    useEffect(() => {
        if (!note) return
        textAreaRef.current.style.height = 'auto'
        textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px'
    }, [note])

    function loadNote() {
        noteService.get(noteId)
            .then(setNote)
    }


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        target.style.height = 'auto'
        target.style.height = target.scrollHeight + 'px'

        setNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                [field]: value
            }
        }))
    }

   function onSave() {
    let noteToSave = note

    if (note.type === 'NoteTodos') {
        const todos = note.info.todos.filter(todo => todo.txt.trim())

        noteToSave = {
            ...note,
            info: {
                ...note.info,
                todos
            }
        }
    }

    noteService.save(noteToSave)
        .then(() => {
            onSaveNote()
            navigate('/note')
        })
}

    function handleTodoChange({ target }, todoIdx) {
        const todos = [...note.info.todos]

        todos[todoIdx] = {
            ...todos[todoIdx],
            txt: target.value
        }

        setNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                todos
            }
        }))
    }

    function onToggleTodo(todoIdx) {
        const todos = [...note.info.todos]

        todos[todoIdx] = {
            ...todos[todoIdx],
            isDone: !todos[todoIdx].isDone
        }

        setNote(prevNote => ({
            ...prevNote,
            info: {
                ...prevNote.info,
                todos
            }
        }))
    }

    function onAddTodo() {
    setNote(prevNote => ({
        ...prevNote,
        info: {
            ...prevNote.info,
            todos: [
                ...prevNote.info.todos,
                {
                    txt: '',
                    isDone: false
                }
            ]
        }
    }))
}

    if (!note) return null
    return <div className="note-edit-backdrop" onClick={onSave}>
        <div
            className="note-edit-modal"
            onClick={ev => ev.stopPropagation()}
        >

            {note.type === 'NoteImg' && note.info.url &&
                <img
                    className="note-edit-img"
                    src={note.info.url}
                    alt=""
                />
            }

            {note.type === 'NoteVideo' && note.info.url &&
                <iframe
                    className="note-edit-video"
                    src={noteService.getYoutubeEmbedUrl(note.info.url)}
                    title="YouTube video"
                    allowFullScreen
                ></iframe>
            }

            <textarea
                className={`note-edit-textarea ${note.type === 'NoteTodos' ? 'todos-title' : ''}`}
                ref={textAreaRef}
                name="txt"
                value={note.info.txt || ''}
                placeholder="Take a note..."
                onChange={handleChange}
            />

            {note.type === 'NoteTodos' &&
                <div className="note-todos-edit">

                    {note.type === 'NoteTodos' &&
                        <NoteTodos
                            info={note.info}
                            onToggleTodo={onToggleTodo}
                            onTodoChange={handleTodoChange}
                            onAddTodo={onAddTodo}
                        />
                    }
                </div>
            }

            <button onClick={onSave}>
                Save
            </button>
        </div>
    </div>
}
