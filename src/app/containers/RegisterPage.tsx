import * as React from "react";
import {RegisterReduxForm} from "../components";
import {IFormData} from "../components/RegisterForm";

class RegisterPage extends React.Component {
  constructor(props: null) {
    super(props);
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
      <RegisterReduxForm onSubmit={this.showResults}/>
    );
  }
}

export {RegisterPage};
