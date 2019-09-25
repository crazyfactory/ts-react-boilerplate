import {storiesOf} from "@storybook/react";
import * as React from "react";
import {Color} from "../constants";
import {Button} from "./Button";

const stories = storiesOf("Button", module);

stories.add(
  "Primary",
  () => (
    <Button>Primary</Button>
  )
);

stories.add(
  "Secondary",
  () => (
    <Button type={"secondary"}>Secondary</Button>
  )
);

stories.add(
  "Disabled",
  () => (
    <Button disabled={true}>Disabled</Button>
  )
);

stories.add(
  "Styled Button",
  () => {
    const style = {
      backgroundColor: Color.BLACK,
      border: 0,
      borderRadius: 5,
      color: Color.BLUE
    };
    return (
      <Button style={style}>
        Styled
      </Button>
    );
  }
);
