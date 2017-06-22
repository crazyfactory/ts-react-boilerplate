import {Promise} from "es6-promise";
import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { aol, email, maxLength, minValue, numberType, renderField, required, tooOld } from "../helpers/FormHelper";
// import {Form} from "../components";

const Form = (props) => {
  const {handleSubmit, pristine, reset, submitting} = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="username"
        type="text"
        component={renderField}
        label="Username"
        validate={[required, maxLength(15)]}
      />
      <Field
        name="email"
        type="email"
        component={renderField}
        label="Email"
        validate={email}
        warn={aol}
      />
      <Field
        name="age"
        type="number"
        component={renderField}
        label="Age"
        validate={[required, numberType, minValue(18)]}
        warn={tooOld}
      />
      <div>
        <button type="submit" disabled={submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

const ReduxForm = reduxForm({
  form: "exampleForm"
})(Form);

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
      <ReduxForm onSubmit={this.showResults}/>
    );
  }
}

export {FormPage};
