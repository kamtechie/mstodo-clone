let nextTodoId = 0;

export const addTodo = (data) => ({
  type: "ADD_TODO",
  id: nextTodoId++,
  text: data.text,
  isFavorite: data.isFavorite,
});

export const deleteTodo = (id) => ({
  type: "DELETE_TODO",
  id,
});

export const updateTodoOrder = (todos) => ({
  type: "UPDATE_TODO_ORDER",
  reordered_todos: todos,
});

export const setVisibilityFilter = (filter) => ({
  type: "SET_VISIBILITY_FILTER",
  filter,
});

export const toggleTodo = (id) => ({
  type: "TOGGLE_TODO",
  id,
});

export const toggleFavorite = (id) => ({
  type: "TOGGLE_FAVORITE",
  id,
});

export const VisibilityFilters = {
  SHOW_ALL: "SHOW_ALL",
  SHOW_COMPLETED: "SHOW_COMPLETED",
  SHOW_ACTIVE: "SHOW_ACTIVE",
};
