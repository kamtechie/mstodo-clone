import React, { useRef } from "react";
import {
  Checkbox,
  IconButton,
  TooltipHost,
  Text,
  Stack,
  FontIcon,
  mergeStyles,
} from "@fluentui/react";
import { Card } from "@uifabric/react-cards";
import { useId } from "@uifabric/react-hooks";
import { useDrag, useDrop } from "react-dnd";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

const styles = {
  card: {
    root: {
      background: "white",
      padding: "0 12px",
      minHeight: "52px",
      width: "100%",
      maxWidth: "100%",
      margin: "auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
    },
  },
  checkbox: {
    checkbox: {
      borderRadius: "50%",
      border: "2px solid rgba(0,0,0,0.5)",
    },
  },
  buttonIconStyles: {
    root: {
      color: "#000000",
      opacity: "70%",
    },
  },
  contextMenu: {
    root: {
      backgroundColor: "white",
      maxWidth: "100px",
      height: "32px",
    },
  },
};

const iconClass = mergeStyles({
  fontSize: 16,
  height: 16,
  width: 16,
  color: "red",
  marginLeft: "8px",
  marginRight: "8px"
});

const calloutProps = { gapSpace: 0 };

function TodoListItem({
  todo,
  toggleFn,
  deleteFn,
  toggleFav,
  index,
  moveCard,
}) {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: "card",
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return;
      }
      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      // Get vertical middle
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      // Determine mouse position
      const clientOffset = monitor.getClientOffset();
      // Get pixels to the top
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%
      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      // Time to actually perform the action
      moveCard(dragIndex, hoverIndex);
      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex;
    },
  });

  const id = todo.id;
  const [{ isDragging }, drag] = useDrag({
    item: { type: "card", id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });
  drag(drop(ref));

  const tooltipId = useId("tooltip");

  //ensures that IDs generated are unique across the global scope for each component instance
  const contextMenuId = useId("contextmenu");

  function deleteTodo(id) {
    deleteFn(id);
  }
  return (
    <>
      <div ref={ref}>
        <ContextMenuTrigger id={contextMenuId} holdToDisplay={-1}>
          <Card styles={styles.card} horizontal>
            <Card.Item>
              <TooltipHost
                content="Mark as completed"
                id={tooltipId}
                calloutProps={calloutProps}
                styles={{ root: { display: "inline-block" } }}
              >
                <Checkbox
                  label={todo.text}
                  checked={todo.completed}
                  onChange={(e) => toggleFn(todo.id)}
                  styles={styles.checkbox}
                />
              </TooltipHost>
            </Card.Item>
            <Card.Item>
              <TooltipHost
                content="Mark task as important"
                id={tooltipId}
                calloutProps={calloutProps}
                styles={{ root: { display: "inline-block" } }}
              >
                <IconButton
                  iconProps={
                    todo.isFavorite
                      ? { iconName: "FavoriteStarFill" }
                      : { iconName: "FavoriteStar" }
                  }
                  title="Mark Important"
                  ariaLabel="Mark Important"
                  styles={styles.buttonIconStyles}
                  onClick={(e) => toggleFav(todo.id)}
                />
              </TooltipHost>
            </Card.Item>
          </Card>
        </ContextMenuTrigger>
      </div>

      <ContextMenu id={contextMenuId}>
        <MenuItem data={{ foo: "bar" }} onClick={(ele) => deleteTodo(todo.id)}>
          <Card horizontal styles={styles.contextMenu}>
            <Stack horizontal verticalAlign="center">
              <Card.Item>
                <FontIcon iconName="Delete" className={iconClass}></FontIcon>
              </Card.Item>
              <Card.Item>
                <Text variant="small">Delete task</Text>
              </Card.Item>
            </Stack>
          </Card>
        </MenuItem>
      </ContextMenu>
    </>
  );
}

export default TodoListItem;
