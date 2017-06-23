import {Promise} from "es6-promise";
import * as React from "react";
import {RegisterForm} from "../components";
import {IFormData} from "../components/RegisterForm";

class RegisterPage extends React.Component<void, void> {
  constructor() {
    super();
    this.showResults = this.showResults.bind(this);
  }
  public showResults(values: IFormData): Promise<any> {
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
      <RegisterForm onSubmit={this.showResults}/>
    );
  }
}

export {RegisterPage};
