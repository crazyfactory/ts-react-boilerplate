import * as React from "react";
import {classes, stylesheet} from "typestyle";
import {Color} from "../constants/Color";

const classNames = stylesheet({
  button: {
    outline: "none",
    padding: "10px 25px"
  },
  disabled: {
    backgroundColor: Color.GREY,
    border: "none",
    color: Color.WHITE,
    cursor: "not-allowed"
  },
  primary: {
    backgroundColor: Color.BLUE,
    border: `1px solid ${Color.BLUE}`,
    color: Color.WHITE,
    cursor: "pointer"
  },
  secondary: {
    backgroundColor: Color.WHITE,
    border: `1px solid ${Color.GREY}`,
    color: Color.GREY,
    cursor: "pointer"
  }
});

export type TButtonType = "primary" | "secondary";

interface IProps extends React.HTMLProps<HTMLButtonElement> {
  /**
   * Either primary or secondary
   */
  type?: TButtonType;
}

export class Button extends React.Component<IProps> {
  public static defaultProps: Partial<IProps> = {
    type: "primary"
  };

  public render(): JSX.Element {
    const {children, className, disabled, type, ...rest} = this.props;
    return (
      <button
        className={classes(classNames.button, disabled ? classNames.disabled : classNames[type], className)}
        disabled={disabled}
        {...rest}
      >
        {children}
      </button>
    );
  }
}
