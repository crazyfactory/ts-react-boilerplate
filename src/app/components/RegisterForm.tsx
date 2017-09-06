import * as React from "react";
import {FormattedMessage} from "react-intl";
import {InjectedFormProps} from "redux-form";
const { reduxForm } = require("redux-form");
import {
  aol, CustomField, CustomFieldRenderer, email, matchedPwd,
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

const usernameRequired = required("username.required", "Username is required");
const usernameMaxLength = maxLength("characters.max", "Must be {max} characters or less")(15);
const passwordRequired = required("password.required", "Password is required");
const passwordMinLength = minLength("characters.min", "Must be {min} characters or more")(8);
const confirmPasswordRequired = required("confirmpassword.required", "Please confirm your password");
const matchedPassword = matchedPwd("password.unmatched", "Passwords are not matched");
const emailInvalid = email("email.invalid", "Invalid email format");
const aolWarn = aol("email.aol", "Really? You still use AOL for your email?");
const ageRequired = required("age.required", "Age is required");
const ageNumberType = numberType("field.numbertype", "Must be a number");
const ageMin = minValue("register.minage", "You must be at least {min} years old!")(18);
const ageTooOld = tooOld("register.tooold", "You are too old for this!");

/*tslint:disable:jsx-no-multiline-js*/
class RegisterForm extends React.Component<Partial<InjectedFormProps<IFormData, IProps>> & IProps, null> {
  public render(): JSX.Element {
    const {handleSubmit, pristine, reset, submitting} = this.props;

    return (
      <form onSubmit={handleSubmit}>
        <CustomFieldRenderer
          name="username"
          type="text"
          component={CustomField}
          languageId="username"
          defaultMessage="Username"
          validate={[usernameRequired, usernameMaxLength]}
        />
        <CustomFieldRenderer
          name="password"
          type="password"
          component={CustomField}
          languageId="password"
          defaultMessage="Password"
          validate={[passwordRequired, passwordMinLength]}
        />
        <CustomFieldRenderer
          name="confirmPassword"
          type="password"
          component={CustomField}
          languageId="confirmpassword"
          defaultMessage="Confirm Password"
          validate={[confirmPasswordRequired, matchedPassword]}
        />
        <CustomFieldRenderer
          name="email"
          type="email"
          component={CustomField}
          languageId="email"
          defaultMessage="Email"
          validate={emailInvalid}
          warn={aolWarn}
        />
        <CustomFieldRenderer
          name="age"
          type="number"
          component={CustomField}
          languageId="age"
          defaultMessage="Age"
          validate={[
            ageRequired,
            ageNumberType,
            ageMin
          ]}
          warn={ageTooOld}
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
