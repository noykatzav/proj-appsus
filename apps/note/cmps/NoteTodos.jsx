export function NoteTodos({ info, onToggleTodo, onTodoChange, onAddTodo }) {
    return <div className="note-todos">

        {!onTodoChange && info.txt &&
            <p>{info.txt}</p>
        }

        {info.todos.map((todo, idx) =>
            <div className="todo-preview" key={idx}>
                <input
                    type="checkbox"
                    checked={todo.isDone}
                    onChange={() => onToggleTodo(idx)}
                    onClick={(ev) => ev.stopPropagation()}
                />

                {onTodoChange &&
                    <input
                        className={todo.isDone ? 'todo-input done' : 'todo-input'}
                        type="text"
                        value={todo.txt}
                        placeholder="List item"
                        onChange={(ev) => onTodoChange(ev, idx)}
                    />
                }
                
                {!onTodoChange && <span className={todo.isDone ? 'done' : ''}>
                    {todo.txt}
                </span>
                }

            </div>
        )}

        {onAddTodo &&
            <button
                className="add-todo-btn"
                type="button"
                onClick={onAddTodo}
            >
                <img src="assets/imgs/plus.svg" alt="Add item" />
                <span>Add item</span>
            </button>
        }

    </div>
}