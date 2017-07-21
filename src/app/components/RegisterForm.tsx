import * as React from "react";
import {FormattedMessage} from "react-intl";
import {InjectedFormProps} from "redux-form";
const { reduxForm } = require("redux-form");
import {
  aol, CustomField, email, FieldExtra, matchedPwd,
  maxLength, minLength, minValue, numberType, required, tooOld
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

/*tslint:disable:jsx-no-multiline-js*/
class RegisterForm extends React.Component<Partial<InjectedFormProps<IFormData, IProps>> & IProps, null> {
  public render(): JSX.Element {
    const {handleSubmit, pristine, reset, submitting} = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <FieldExtra
          name="username"
          type="text"
          component={CustomField}
          languageId="username"
          defaultMessage="Username"
          validate={[required("username.required", "Username is required"), maxLength("characters.max", "Must be {max} characters or less")(15)]}
        />
        <FieldExtra
          name="password"
          type="password"
          component={CustomField}
          languageId="password"
          defaultMessage="Password"
          validate={[required("password.required", "Password is required"), minLength("characters.min", "Must be {min} characters or more")(8)]}
        />
        <FieldExtra
          name="confirmPassword"
          type="password"
          component={CustomField}
          languageId="confirmpassword"
          defaultMessage="Confirm Password"
          validate={[required("confirmpassword.required", "Please confirm your password"), matchedPwd("password.unmatched", "Passwords are not matched")]}
        />
        <FieldExtra
          name="email"
          type="email"
          component={CustomField}
          languageId="email"
          defaultMessage="Email"
          validate={email("email.invalid", "Invalid email format")}
          warn={aol("email.aol", "Really? You still use AOL for your email?")}
        />
        <FieldExtra
          name="age"
          type="number"
          component={CustomField}
          languageId="age"
          defaultMessage="Age"
          validate={[
            required("age.required", "Age is required"),
            numberType("field.numbertype", "Must be a number"),
            minValue("register.minage", "You must be at least {min} years old!")(18)
          ]}
          warn={tooOld("register.tooold", "You are too old for this!")}
        />
        <div>
          <button type="submit" disabled={submitting}><FormattedMessage id="submit" defaultMessage="Submit" /></button>
          <button type="button" disabled={pristine || submitting} onClick={reset} style={{marginLeft: 10}}>
            <FormattedMessage id="form.clearvalues" defaultMessage="Clear Values" />
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
