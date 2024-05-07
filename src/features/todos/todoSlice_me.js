/* eslint-disable default-case */
import { produce } from "immer";
import { StatusFilters } from "../filter/filtersSlice";
import { createSelector } from "reselect";

const initState = {
  entities: {
    1: { id: 1, text: "Deign ui", completed: true, color: "red" },
    2: { id: 2, text: "discover state", completed: false },
    3: { id: 3, text: "discover actions", completed: false },
    4: { id: 4, text: "implement reducer", completed: false, color: "blue" },
    5: { id: 5, text: "Complete patterns", completed: true, color: "red" },
  },
};

const todos = produce((state, action) => {
  switch (action.type) {
    case "todos/todoAdded":
      const todo = action.payload;
      state.entities[todo.id] = todo;
      break;
    case "todos/todoToggled":
      const toggledTodoId = action.payload;
      const todoToggled = state.entities[toggledTodoId];
      state.entities[toggledTodoId].completed = !todoToggled.completed;
      break;
    case "todos/todoDelete":
      const deletedTodoId = action.payload;
      delete state.entities[deletedTodoId];
      break;
  }
}, initState);

export default todos;

// export default function todos(state = initState, action) {
//   switch (action.type) {
//     case "todos/todoAdded":
//       const todo = action.payload;
//       //   return {
//       //     ...state,
//       //     entities: [...state.entities, todo],
//       //   };
//       return {
//         ...state,
//         entities: {
//           ...state.entities,
//           [todo.id]: todo,
//         },
//       };
//     case "todos/todoToggled":
//       const toggledTodoId = action.payload;
//       //   return {
//       //     ...state,
//       //     entities: state.entities.map((todo) => {
//       //       if (todo.id === toggledTodoId) {
//       //         return {
//       //           ...state,
//       //           completed: !todo.completed,
//       //         };
//       //       }

//       //       return todo;
//       //     }),
//       //   };
//       const todoToggled = state.entities[toggledTodoId];
//       return {
//         ...state,
//         entities: {
//           ...state.entities,
//           [toggledTodoId]: {
//             ...todoToggled,
//             completed: !todoToggled.completed,
//           },
//         },
//       };
//     case "todos/todoDelete":
//       const deletedTodoId = action.payload;
//       //   return {
//       //     ...state,
//       //     entities: state.entities.filter((todo) => todo.id !== deletedTodoId),
//       //   };
//       const entities = { ...state.entities };
//       delete entities[deletedTodoId];
//       return {
//         ...state,
//         entities,
//       };
//     default:
//       return state;
//   }
// }

export const todoAdded = (text) => {
  return {
    type: "todos/todoAdded",
    payload: { id: 6, text: text, completed: false },
  };
};

export const todoToggled = (todoId) => {
  return {
    type: "todos/todoToggled",
    payload: todoId,
  };
};

export const todoDelete = (todoId) => {
  return {
    type: "todos/todoDelete",
    payload: todoId,
  };
};

export const selectTodoEntities = (state) => state.todos.entities;

export const selectTodosIds = (state) => Object.keys(state.todos.entities);

const selectTodos = createSelector(selectTodosIds, (todoEntities) =>
  Object.values(todoEntities)
);

const selectFilteredTodos = createSelector(
  selectTodos,
  (state) => state.filters,
  (todos, filters) => {
    const { status, colors } = filters;
    const showAll = status === StatusFilters.All;

    if (showAll && colors.length === 0) {
      return todos;
    }

    const showCompleted = status === StatusFilters.Completed;
    return todos.filter((todo) => {
      const statusFilter = showAll || todo.completed === showCompleted;
      const colorsFilter = colors.length === 0 || colors.includes(todo.color);

      return statusFilter && colorsFilter;
    });
  }
);

// export const selectFilteredTodos = state => {
//   const todos = selectTodos(state)
//   const {status , colors} = state.filters

//   const showAll = status === StatusFilters.All

//   if (showAll && colors.length === 0 ) {
//     return todos
//   }

//   const showCompleted = status === StatusFilters.Completed
//   return todos.filter(todo => {
//     const statusFilters = showAll || todo.completed === showCompleted
//     const colorsFilter = colors.length === 0 || colors.includes(todo.color)

//     return statusFilters && colorsFilter
//   })
// }

export const selectFilteredTodoIds = createSelector(
  selectFilteredTodos,
  (filteredTodos) => filteredTodos.map((todo) => console.log(todo))
);

// export const selectFilterdTodoIds = (state) => {
//   const filteredTodos = selectFilteredTodos(state);

//   return filteredTodos.map((todo) => todo.id);
// };
