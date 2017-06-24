import * as React from "react";
import { Field, FormProps } from "redux-form";
const { reduxForm } = require("redux-form");
import {
  aol, email, matchedPwd, maxLength, minLength, minValue,
  numberType, renderField, required, tooOld
} from "../helpers/FormHelper";

export interface IFormData {
  username: string;
  password: string;
  confirmPassword: string;
  email: string;
  age: number;
}

interface IProps {
  onSubmit: (values: IFormData) => Promise<any>;
}

class RegisterForm extends React.Component<FormProps<IFormData, IProps, void> & IProps, void> {
  public render(): JSX.Element {
    const {handleSubmit, pristine, reset, submitting} = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <Field name="username" type="text" component={renderField} label="Username" validate={[required, maxLength(15)]}/>
        <Field name="password" type="password" component={renderField} label="Password" validate={[required, minLength(8)]}/>
        <Field name="confirmPassword" type="password" component={renderField} label="Confirm Password" validate={[required, matchedPwd]}/>
        <Field name="email" type="email" component={renderField} label="Email" validate={email} warn={aol}/>
        <Field name="age" type="number" component={renderField} label="Age" validate={[required, numberType, minValue(18)]} warn={tooOld}/>
        <div>
          <button type="submit" disabled={submitting}>Submit</button>
          <button type="button" disabled={pristine || submitting} onClick={reset} style={{marginLeft: 10}}>
            Clear Values
          </button>
        </div>
      </form>
    );
  }
}

const RegisterReduxForm = reduxForm({
  form: "register"
})(RegisterForm);

// export RegisterForm for testing
export {RegisterReduxForm, RegisterForm};
