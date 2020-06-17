import React, { useState } from "react";
import {
  Text,
  TextField,
  PrimaryButton,
  FontIcon,
  mergeStyles,
} from "@fluentui/react";
import { Card } from "@uifabric/react-cards";

const styles = {
  addCard: {
    root: {
      background: "rgba(0,0,0,0.5)",
      padding: "0 12px",
      minHeight: "52px",
      width: "60%",
      maxWidth: "60%",
      margin: "auto",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      position: "fixed",
      bottom: "2em"
    },
  },
  inputCard: {
    root: {
      background: "white",
      padding: "0 12px",
      minHeight: "52px",
      width: "60%",
      maxWidth: "60%",
      margin: "auto",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      position: "fixed",
      marginTop: "80vh",
      bottom: "2em"
    },
  },
  inputTextField: {
    root: {
      width: "75%",
    },
  },
};

const iconClass = mergeStyles({
  fontSize: 16,
  height: 16,
  width: 16,
  color: "white",
  marginLeft: "8px",
  marginRight: "8px",
});

function AddTodoItem({ addFn }) {
  const [showInput, setShowInput] = useState(false);
  const [inputVal, setInputVal] = useState("");

  function addTaskToState(task) {
    addFn(task);
    setInputVal(""); // clear text field
    setShowInput(false);
  }
  return (
    <div>
      {showInput ? (
        <Card styles={styles.inputCard} horizontal>
          <Card.Item styles={styles.inputTextField}>
            <TextField
              onChange={(e) => {
                setInputVal(e.target.value);
              }}
              label="Task name:"
              value={inputVal}
              underlined
            />
          </Card.Item>
          <Card.Item>
            <PrimaryButton
              text="Add"
              onClick={() => {
                addTaskToState(inputVal);
              }}
              allowDisabledFocus
              disabled={false}
              s
              checked={false}
            />
          </Card.Item>
        </Card>
      ) : (
        <Card
          onClick={() => setShowInput(true)}
          styles={styles.addCard}
          horizontal
        >
          <Card.Item>
            <FontIcon iconName="Add" className={iconClass}></FontIcon>
          </Card.Item>
          <Card.Item>
            <Text variant="medium" styles={{ root: { color: "white" } }}>Add a task. Type @ to assign it to someone.</Text>
          </Card.Item>
        </Card>
      )}
    </div>
  );
}

export default AddTodoItem;
