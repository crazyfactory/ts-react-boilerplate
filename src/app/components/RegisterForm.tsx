import * as React from "react";
import { Field, FormProps, reduxForm } from "redux-form";
import {
  aol, email, maxLength, minLength, minValue,
  numberType, renderField, required, tooOld
} from "../helpers/FormHelper";

export interface IFormData {
  username: string;
  password: string;
  email: string;
  age: number;
}

interface IProps {
  onSubmit: (values: IFormData) => Promise<any>;
}

class Form extends React.Component<FormProps<IFormData, IProps, void> & IProps, void> {
  public render(): JSX.Element {
    const {handleSubmit, pristine, reset, submitting} = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field name="username" type="text" component={renderField} label="Username" validate={[required, maxLength(15)]}/>
        <Field name="password" type="password" component={renderField} label="Password" validate={[required, minLength(8)]}/>
        <Field name="confirm-password" type="password" component={renderField} label="Confirm Password" validate={[required, minLength(8)]}/>
        <Field name="email" type="email" component={renderField} label="Email" validate={email} warn={aol}/>
        <Field name="age" type="number" component={renderField} label="Age" validate={[required, numberType, minValue(18)]} warn={tooOld}/>
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
