import * as React from "react";

const Stage: React.FunctionComponent<{initialState: any}> = ({children, initialState}) => {
  const [state, setState] = React.useState(initialState);
  return (
    <div>{(children as any)(state, setState)}</div>
  );
};

const renderChildrenFn = (story, context) => (state, setState) => {
  const setCombinedState = (updatedState) => setState({...state, ...updatedState});
  return <div>{story({...context, state, setState: setCombinedState})}</div>;
};

export function withInitialState(initialState: any): (
  story: (...args: any) => JSX.Element,
  context: any
) => JSX.Element {
  return (story, context) => (
    <>
      <Stage initialState={initialState}>
        {renderChildrenFn(story, context)}
      </Stage>
      <div style={{backgroundColor: "#eee", marginTop: 30, maxWidth: 500, overflowX: "auto", padding: 10}}>
        initialState: {JSON.stringify(initialState)}
      </div>
    </>
  );
}
