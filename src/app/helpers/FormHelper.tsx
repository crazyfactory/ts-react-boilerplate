import * as React from "react";
import {style} from "typestyle";

export const required = (value) => (value ? undefined : "Required");

export const maxLength = (max) => (value) => value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const numberType = (value) => value && isNaN(Number(value)) ? "Must be a number" : undefined;

export const minValue = (min) => (value) => value && value < min ? `Must be at least ${min}` : undefined;

export const email = (value) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid email address" : undefined;

export const tooOld = (value) => value && value > 65 ? "You might be too old for this" : undefined;

export const aol = (value) => value && /.+@aol\.com/.test(value) ? "Really? You still use AOL for your email?" : undefined;

/* tslint:disable:object-literal-sort-keys */
const Styles = {
  container: style({
    display: "flex"
  }),
  label: style({
    marginRight: 10,
    minWidth: 150,
    textAlign: "right"
  }),
  inputContainer: style({
    display: "flex",
    flex: 1,
    flexDirection: "column",
    maxWidth: 500
  })
};
/* tslint:enable:object-literal-sort-keys */

export const renderField = ({input, label, type, meta: {touched, error, warning}}) => (
  <div className={Styles.container}>
    <label className={Styles.label}>{label}</label>
    <div className={Styles.inputContainer}>
      <input {...input} placeholder={label} type={type} />
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
);
