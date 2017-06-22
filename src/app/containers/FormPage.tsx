import {Promise} from "es6-promise";
import * as React from "react";
import {Form} from "../components";

class FormPage extends React.Component<void, void> {
  constructor() {
    super();
    this.showResults = this.showResults.bind(this);
  }
  public showResults(values: any): Promise<any> {
    return new Promise((resolve) => {
      setTimeout(
        () => {
          window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
          resolve();
        },
        500
      );
    });
  }

  public render(): JSX.Element {
    return (
      <Form onSubmit={this.showResults}/>
    );
  }
}

export {FormPage};
