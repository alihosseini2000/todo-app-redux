import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as TimesSolid } from "./times-solid.svg";
import { todoDelete, todoToggled } from "./todoSlice";

export const availableColors = ["green", "blue", "orange", "purple", "red"];
export const capitalize = (s) => s[0].toUpperCase() + s.slice(1);

const TodoListItem = ({ id }) => {

  const todo = useSelector((state) => state.todos.entities[id]);
  const dispatch = useDispatch();

  const { text, completed, color } = todo;
  const colorOptions = availableColors.map((c) => (
    <option key={c} value={c}>
      {capitalize(c)}
    </option>
  ));

  const completedChanged = () => {
    dispatch(todoToggled(todo.id));
  };

  const deleteItem = () => {
    dispatch(todoDelete(todo.id));
  };

  return (
    <li>
      <div className="view">
        <div className="segment label">
          <input
            className="toggle"
            type="checkbox"
            onChange={completedChanged}
            checked={completed}
          />
          <div className="todo-text">{text}</div>
        </div>
        <div className="segment buttons">
          <select
            className="colorPicker"
            defaultValue={color}
            style={{ color }}>
            <option value=""></option>
            {colorOptions}
          </select>
          <button className="destroy" onClick={deleteItem}>
            <TimesSolid />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoListItem;
