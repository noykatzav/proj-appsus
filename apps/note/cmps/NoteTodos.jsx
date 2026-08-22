export function NoteTodos({ info }) {
    return <div className="note-todos">

        {info.txt &&
            <p>{info.txt}</p>
        }

        {info.todos.map((todo, idx) =>
            <div className="todo-preview" key={idx}>
                <input
                    type="checkbox"
                    checked={todo.isDone}
                />

                <span className={todo.isDone ? 'done' : ''}>
                    {todo.txt}
                </span>
            </div>
        )}

    </div>
}