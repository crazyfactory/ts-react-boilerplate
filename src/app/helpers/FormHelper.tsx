import * as React from "react";
import {WrappedFieldProps} from "redux-form";
interface IRenderFieldProps<T> extends WrappedFieldProps<T> {
  label?: string;
  type?: string;
}

export const required = (value) => (value ? undefined : "Required");

export const maxLength = (max) => (value) => value && value.length > max ? `Must be ${max} characters or less` : undefined;

export const minLength = (min) => (value) => value && value.length < min ? `Must be ${min} characters or more` : undefined;

export const numberType = (value) => value && isNaN(Number(value)) ? "Must be a number" : undefined;

export const minValue = (min) => (value) => value && value < min ? `Must be at least ${min}` : undefined;

export const email = (value) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? "Invalid email address" : undefined;

export const tooOld = (value) => value && value > 65 ? "You might be too old for this" : undefined;

export const aol = (value) => value && /.+@aol\.com/.test(value) ? "Really? You still use AOL for your email?" : undefined;

export const renderField = (props: IRenderFieldProps<any>) => {
  const {input, label, type, meta: {active, touched, error, warning}} = props;
  return (
    <div>
      <label>{props.label}</label>
      <div>
        <input {...input} placeholder={label} type={type} />
        {(active || touched) && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
      </div>
    </div>
  );
};
