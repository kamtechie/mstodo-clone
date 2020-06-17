import React from "react";
import TodoItemContainer from "./containers/TodoItemContainer";
import Sidebar from "./containers/Sidebar";
import { Stack } from "@fluentui/react";
import "./App.css";
import bg from "./img/beach_bg.jpg";
import { Provider } from "react-redux";
import store from "./redux/store";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const bgStyle = {
  backgroundImage: `url(${bg})`,
  height: "100%",
};

function App() {
  return (
    <Provider store={store}>
      <DndProvider backend={HTML5Backend}>
        <div>
          <Stack horizontal>
            <Stack.Item grow={1}>
              <Sidebar />
            </Stack.Item>
            <Stack.Item grow={7}>
              <div style={bgStyle}>
                <TodoItemContainer />
              </div>
            </Stack.Item>
          </Stack>
        </div>
      </DndProvider>
    </Provider>
  );
}

export default App;
