import * as React from "react";
import { Field, reduxForm } from "redux-form";
import { aol, email, maxLength, minValue, numberType, renderField, required, tooOld } from "../helpers/FormHelper";

class Form extends React.Component<any, any> {
  public render(): JSX.Element {
    const {handleSubmit, pristine, reset, submitting} = this.props;

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
  }
}

const ReduxForm = reduxForm({
  form: "example"
})(Form);

export {ReduxForm as Form};
