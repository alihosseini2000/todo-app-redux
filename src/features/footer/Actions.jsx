import React from "react";
import { useDispatch } from "react-redux";
import { clearCompleted, markAllCompleted } from "../todos/todosSlice";

function Actions() {
  const dispatch = useDispatch();

  const onMarkAllCompleted = () => dispatch(markAllCompleted());

  const onClearCompleted = () => dispatch(clearCompleted());

  return (
    <div className="actions">
      <h5>Actions</h5>
      <button className="button" onClick={onMarkAllCompleted}>
        Mark All Completed
      </button>
      <button className="button" onClick={onClearCompleted}>
        Clear Completed
      </button>
    </div>
  );
}

export default Actions;
