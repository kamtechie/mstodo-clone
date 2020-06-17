import React, { useCallback } from "react";
import { connect } from "react-redux";
import TodoListItem from "../components/TodoListItem";
import AddTodoItem from "../components/AddTodoItem";
import {
  toggleTodo,
  VisibilityFilters,
  toggleFavorite,
  addTodo,
  deleteTodo,
  updateTodoOrder
} from "../redux/actions";
import { Stack, Text, IconButton } from "@fluentui/react";
import update from 'immutability-helper'

const containerStyle = {
  width: "75%",
  height: "100%",
};

const styles = {
  containerStack: {
    root: {
      height: "100%",
    },
  },
  headerStack: {
    root: {
      margin: "2em 0",
    },
  },
  headerButtons: {
    root: {
      color: "white",
      backgroundColor: "#000000",
      opacity: "70%",
      borderRadius: "4px",
      margin: "0 8px",
    },
  },
  headerText: {
    root: {
      color: "white",
    },
  }
};

const verticalGapStackTokens = {
  childrenGap: 5,
};

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case VisibilityFilters.SHOW_ALL:
      return todos;
    case VisibilityFilters.SHOW_COMPLETED:
      return todos.filter((t) => t.completed);
    case VisibilityFilters.SHOW_ACTIVE:
      return todos.filter((t) => !t.completed);
    default:
      throw new Error("Unknown filter: " + filter);
  }
};

const mapStateToProps = (state) => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
});

const mapDispatchToProps = (dispatch) => ({
  toggleTodo: (id) => dispatch(toggleTodo(id)),
  toggleFavorite: (id) => dispatch(toggleFavorite(id)),
  addTodo: (text) => dispatch(addTodo({text: text})),
  deleteTodo: (id) => dispatch(deleteTodo(id)),
  updateOrder: (arr) => dispatch(updateTodoOrder(arr))
});

function TodoItemContainer({ todos, category, toggleTodo, toggleFavorite, addTodo, deleteTodo, updateOrder }) {
  console.log(todos);
  const moveCard = useCallback(
    (dragIndex, hoverIndex) => {
      const dragCard = todos[dragIndex];
      updateOrder(
        update(todos, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragCard],
          ],
        })
      );
    },
    [todos]
  );
  return (
    <Stack styles={styles.containerStack} horizontalAlign="center">
      <div style={containerStyle}>
        <Stack
          styles={styles.headerStack}
          tokens={verticalGapStackTokens}
          horizontal
          horizontalAlign="space-between"
          verticalAlign="center"
        >
          <Stack.Item>
            <Text variant="xxLarge" styles={styles.headerText}>
              My Day
            </Text>
          </Stack.Item>
          <Stack horizontal>
            <Stack.Item>
              <IconButton
                iconProps={{ iconName: "People" }}
                title="Add People"
                ariaLabel="AddPeople"
                styles={styles.headerButtons}
              />
            </Stack.Item>
            <Stack.Item>
              <IconButton
                iconProps={{ iconName: "More" }}
                title="Add People"
                ariaLabel="AddPeople"
                styles={styles.headerButtons}
              />
            </Stack.Item>
          </Stack>
        </Stack>

        <Stack tokens={verticalGapStackTokens}>
          {todos.map((todo, i) => (
            <TodoListItem
              todo={todo}
              index={i}
              toggleFn={toggleTodo}
              deleteFn={deleteTodo}
              toggleFav={toggleFavorite}
              moveCard={moveCard}
            />
          ))}{" "}
        </Stack>

        <AddTodoItem addFn={addTodo}/>
      </div>
    </Stack>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TodoItemContainer);
