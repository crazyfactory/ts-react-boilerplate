import {Promise} from "es6-promise";
import * as React from "react";
import { Field, reduxForm } from "redux-form";
// import { aol, email, maxLength, minValue, numberType, renderField, required, tooOld } from "../helpers/FormHelper";
// import {Form} from "../components";

const required = (value) => (value ? undefined : "Required");

const maxLength = (max) => (value) => value && value.length > max ? `Must be ${max} characters or less` : undefined;

const numberType = (value) => value && isNaN(Number(value)) ? "Must be a number" : undefined;

const minValue = (min) => (value) => value && value < min ? `Must be at least ${min}` : undefined;

const email = (value) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid email address" : undefined;

const tooOld = (value) => value && value > 65 ? "You might be too old for this" : undefined;

const aol = (value) => value && /.+@aol\.com/.test(value) ? "Really? You still use AOL for your email?" : undefined;

const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);

let Form = (props) => {
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

Form = reduxForm({
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
      <Form onSubmit={this.showResults}/>
    );
  }
}

export {FormPage};
