import TodoListItem from './TodoListItem'
import { shallowEqual, useSelector } from 'react-redux'
import { selectFilterdTodoIds } from './todoSlice'

const TodoList = () => {
    // const todos = useSelector(selectTodos)
    const todosIds = useSelector(selectFilterdTodoIds , shallowEqual)

    const renderedListItems = todosIds.map((id) => {
        return <TodoListItem key={id} id={id} />
    })

    return <ul className="todo-list">{renderedListItems}</ul>
}

export default TodoList
