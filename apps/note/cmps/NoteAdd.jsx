import { NoteActions } from "./NoteActions.jsx"
import { noteService } from '../services/note.service.js'

const { useState, useRef } = React


export function NoteAdd({ onAddNote }) {
    const [info, setInfo] = useState({ txt: '' })
    const [isExpanded, setIsExpanded] = useState(false)
    const textareaRef = useRef(null)
    const [noteType, setNoteType] = useState('NoteTxt')
    const videoEmbedUrl = noteService.getYoutubeEmbedUrl(info.url || '')


    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        target.style.height = 'auto'
        target.style.height = target.scrollHeight + 'px'

        setInfo(prevInfo => ({
            ...prevInfo,
            [field]: value
        }))
    }

    function onSaveNote() {
        if (noteType === 'NoteTxt' && info.txt.trim()) {
            onAddNote(noteType, info)
        }
        if (noteType === 'NoteImg' && info.url) {
            onAddNote(noteType, info)
        }

        if (noteType === 'NoteVideo' && videoEmbedUrl) {
            onAddNote(noteType, info)
        }

        setInfo({ txt: '' })
        setNoteType('NoteTxt')
        setIsExpanded(false)
        textareaRef.current.style.height = '50px'
    }

    function handleImgUpload(file) {
        const reader = new FileReader()

        reader.onload = () => {
            setNoteType('NoteImg')
            setInfo(prevInfo => ({
                ...prevInfo,
                url: reader.result
            }))

            setIsExpanded(true)
        }
        reader.readAsDataURL(file)
    }

    function onAddVideo() {
        setNoteType('NoteVideo')
        setInfo({
            txt: '',
            url: ''
        })
        setIsExpanded(true)
    }

    function handleVideoChange({ target }) {
        setInfo(prevInfo => ({
            ...prevInfo,
            url: target.value
        }))
    }

    function onAddTodos() {
        setNoteType('NoteTodos')

        setInfo({
            txt: '',
            todos: [
                {
                    txt: '',
                    isDone: false
                }
            ]
        })

        setIsExpanded(true)
    }

    function handleTodoChange({ target }, todoIdx) {
        const todos = [...info.todos]

        todos[todoIdx] = {
            ...todos[todoIdx],
            txt: target.value
        }

        setInfo(prevInfo => ({
            ...prevInfo,
            todos
        }))
    }

    function onToggleTodo(todoIdx) {
        const todos = [...info.todos]
        const todo = { ...todos[todoIdx] }

        todo.isDone = !todo.isDone
        todos[todoIdx] = todo

        setInfo(prevInfo => ({
            ...prevInfo,
            todos
        }))
    }


    return <section className={`note-add ${isExpanded ? 'expanded' : ''}`}>
        <textarea
            ref={textareaRef}

            name="txt"
            value={info.txt}
            placeholder="Take a note..."
            onChange={handleChange}
            onFocus={() => setIsExpanded(true)}
        />

        {noteType === 'NoteVideo' &&
            <div className="note-video-add">
                <input
                    type="text"
                    value={info.url || ''}
                    placeholder="Enter YouTube URL"
                    onChange={handleVideoChange}
                />
                {videoEmbedUrl &&
                    <iframe
                        src={videoEmbedUrl}
                        title="YouTube video"
                        allowFullScreen
                    ></iframe>
                }
            </div>
        }

        {noteType === 'NoteImg' && info.url &&
            <img
                className="note-add-img"
                src={info.url}
                alt=""
            />
        }

        {noteType === 'NoteTodos' &&
            <div className="note-todos-add">
                {info.todos.map((todo, idx) =>
                    <div className="todo-row" key={idx}>
                        <input
                            type="checkbox"
                            checked={todo.isDone}
                            onChange={() => onToggleTodo(idx)}
                        />

                        <input
                            className={todo.isDone ? 'todo-input done' : 'todo-input'}
                            type="text"
                            value={todo.txt}
                            placeholder="List item"
                            onChange={(ev) => handleTodoChange(ev, idx)}
                        />
                    </div>
                )}
            </div>
        }

        {!isExpanded &&
            <NoteActions
                actions={['image', 'video', 'todos']}
                onImgUpload={handleImgUpload}
                onAddVideo={onAddVideo}
                onAddTodos={onAddTodos}
            />
        }

        {isExpanded &&
            <button className="note-close-btn" onClick={onSaveNote}>
                Close
            </button>}

    </section>
}

