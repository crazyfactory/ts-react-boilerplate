import * as React from "react";
import {WrappedFieldProps} from "redux-form";
import {style} from "typestyle";

interface IRenderFieldProps<T> extends WrappedFieldProps<T> {
  label?: string;
  type?: string;
}

export const required = (value) => (value ? undefined : "Required");

export const maxLength = (max) => (value) => value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = (min) => (value) => value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const numberType = (value) => value && isNaN(Number(value)) ? "Must be a number" : undefined;

export const minValue = (min) => (value) => value < min ? `Must be at least ${min}` : undefined;

export const matchedPwd = (value, otherValues) => value !== otherValues.password ? `Passwords not matched` : undefined;

export const email = (value) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid email address" : undefined;

export const tooOld = (value) => value && value > 65 ? "You might be too old for this" : undefined;

export const aol = (value) => value && /.+@aol\.com/.test(value) ? "Really? You still use AOL for your email?" : undefined;

/*tslint:disable:object-literal-sort-keys*/
const styles = {
  row: style({
    margin: "15px 0"
  }),
  inputItem: style({
    padding: 5,
    border: "1px solid #ccc"
  }),
  message: style({
    marginTop: 5
  }),
  error: style({
    color: "red"
  }),
  warning: style({
    color: "darkorange"
  })
};
/*tslint:enable:object-literal-sort-keys*/

/*tslint:disable:jsx-no-multiline-js*/
export const renderField = (props: IRenderFieldProps<any>) => {
  const {input, label, type, meta: {active, touched, error, warning}} = props;
  return (
    <div className={styles.row}>
      <label>{props.label}</label>
      <div>
        <input {...input} placeholder={label} type={type} className={styles.inputItem} />
        {
          (active || touched) &&
          (
            (error && <div className={styles.message}><span className={styles.error}>{error}</span></div>)
            ||
            (warning && <div className={styles.message}><span className={styles.warning}>{warning}</span></div>)
          )
        }
      </div>
    </div>
  );
};
