import React from "react";
import { Nav, initializeIcons, Stack, Text } from "@fluentui/react";
import Avatar from "../components/Avatar";
import pic from "../img/avatar.jpg";

const navigationStyles = {
  root: {
    height: "100%",
    boxSizing: "border-box",
    border: "1px solid #eee",
    overflowY: "auto",
  },
};

const links = [
  {
    links: [
      {
        name: "My Day",
        key: "key1",
        url: "/",
        iconProps: {
          iconName: "News",
          styles: {
            root: {
              fontSize: 18,
            },
          },
        },
      },
      {
        name: "Important",
        key: "key2",
        url: "/",
        iconProps: {
          iconName: "FavoriteStar",
          styles: {
            root: {
              fontSize: 18,
              color: "#c23732",
            },
          },
        },
      },
      {
        name: "Planned",
        key: "key3",
        url: "/",
        iconProps: {
          iconName: "Calendar",
          styles: {
            root: {
              fontSize: 18,
            },
          },
        },
      },
      {
        name: "Assigned to you",
        key: "key4",
        url: "/",
        iconProps: {
          iconName: "Contact",
          styles: {
            root: {
              fontSize: 18,
              color: "#418669",
            },
          },
        },
      }, 
      {
        name: "Tasks",
        key: "key5",
        url: "/",
        iconProps: {
          iconName: "Home",
          styles: {
            root: {
              fontSize: 18,
            },
          },
        },
      },
    ],
  },
];

function Sidebar() {
  initializeIcons();
  return (
    <>
      <div style={{
        height: "100vh",
      }}>
        <Stack
          horizontal
          styles={{ root: { height: 48 } }}
          verticalAlign="center"
          horizontalAlign="space-between"
        >
          <Stack horizontal verticalAlign="center">
            <Avatar src={pic} side={36} />
            <Stack>
              <Text variant="medium">Karthikeyan Arumugam</Text>
              <Text styles={{root: {color: "#000", opacity: "60%"}}}variant="small">kamtechie@gmail.com</Text>
            </Stack>
          </Stack> 
        </Stack>
        <Nav groups={links} selectedKey="key1" styles={navigationStyles}></Nav>
      </div>
    </>
  );
}

export default Sidebar;
