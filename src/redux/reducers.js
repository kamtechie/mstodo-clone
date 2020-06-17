import { VisibilityFilters } from "./actions";

export const todos = (state = [], action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        {
          id: action.id,
          text: action.text,
          completed: false,
          isFavorite: false,
          categoryId: action.categoryId,
        },
      ];
    case "DELETE_TODO":
        return state.filter(todo => todo.id !== action.id)
    case "UPDATE_TODO_ORDER":
      console.log(action.reordered_todos);
      return action.reordered_todos;
    case "ADD_CATEGORY":
      return [
        ...state,
        {
          id: action.id,
          name: action.name,
        },
      ];
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, completed: !todo.completed } : todo
      );
    case "TOGGLE_FAVORITE":
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, isFavorite: !todo.isFavorite } : todo
      );
    default:
      return state;
  }
};

export const visibilityFilter = (
  state = VisibilityFilters.SHOW_ALL,
  action
) => {
  switch (action.type) {
    case "SET_VISIBILITY_FILTER":
      return action.filter;
    default:
      return state;
  }
};
