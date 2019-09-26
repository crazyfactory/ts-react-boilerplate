import * as React from "react";

const Stage: React.FunctionComponent<{initialState: any}> = ({children, initialState}) => {
  const [state, setState] = React.useState(initialState);
  return (
    <div>{(children as any)(state, setState)}</div>
  );
};

export function withInitialState(initialState: any): (
  story: (...args: any) => JSX.Element,
  context: any
) => JSX.Element {
  return (story, context) => (
    <Stage initialState={initialState}>
      {(state, setState) => <div>{story({...context, state, setState})}</div>}
    </Stage>
  );
}
