import * as React from "react";
import {FormattedMessage} from "react-intl";
import {connect} from "react-redux";
import {Field, GenericField, WrappedFieldInputProps, WrappedFieldMetaProps} from "redux-form";
import {style} from "typestyle";
import {IStore} from "../redux/IStore";

interface IFlexWrappedFieldProps {
  input?: Partial<WrappedFieldInputProps>;
  meta?: Partial<WrappedFieldMetaProps>;
}

// While waiting for this pull request https://github.com/DefinitelyTyped/DefinitelyTyped/pull/17693,
// we overrides meta as any for now
interface IRenderFieldProps extends IFlexWrappedFieldProps {
  defaultMessage: string;
  languageId: string;
  type?: string;
}

export const FieldExtra = Field as new () => GenericField<IRenderFieldProps>;

export const required = (id, defaultMessage) => (value) => (value ? undefined : {id, defaultMessage});

export const maxLength = (id, defaultMessage) => (max) => (value) => value && value.length > max ? {id, defaultMessage, values: {max}} : undefined;

export const minLength = (id, defaultMessage) => (min) => (value) => value && value.length < min ? {id, defaultMessage, values: {min}} : undefined;

export const numberType = (id, defaultMessage) => (value) => value && isNaN(Number(value)) ? {id, defaultMessage} : undefined;

export const minValue = (id, defaultMessage) => (min) => (value) => value < min ? {id, defaultMessage, values: {min}} : undefined;

export const matchedPwd = (id, defaultMessage) => (value, otherValues) => value !== otherValues.password ? {id, defaultMessage} : undefined;

export const email = (id, defaultMessage) => (value) => value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? {id, defaultMessage} : undefined;

export const tooOld = (id, defaultMessage) => (value) => value && value > 65 ? {id, defaultMessage} : undefined;

export const aol = (id, defaultMessage) => (value) => value && /.+@aol\.com/.test(value) ? {id, defaultMessage} : undefined;

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
class CustomField extends React.Component<IStateToProps & IRenderFieldProps, null> {
  public render(): JSX.Element {
    const {defaultMessage, input, languageId, type, meta: {active, touched, error, warning}} = this.props;
    return (
      <div className={styles.row}>
        <FormattedMessage id={languageId} defaultMessage={defaultMessage} />
        <div>
          <input {...input} placeholder={this.props.languageData[languageId] || defaultMessage} type={type} className={styles.inputItem} />
          {
            (active || touched) &&
            (
              (
                error &&
                <div className={styles.message}>
                <span className={styles.error}>
                  <FormattedMessage id={error.id} defaultMessage={error.defaultMessage} values={error.values} />
                </span>
                </div>
              )
              ||
              (
                warning &&
                <div className={styles.message}>
                <span className={styles.warning}>
                  <FormattedMessage id={warning.id} defaultMessage={warning.defaultMessage} values={warning.values} />
                </span>
                </div>
              )
            )
          }
        </div>
      </div>
    );
  }
}

interface IStateToProps {
  languageData: any;
}

const mapStateToProps = (state: Partial<IStore>) => ({
  languageData: state.language.payload.languageData
});

const ConnectedCustomField = connect<IStateToProps, null, IRenderFieldProps>(mapStateToProps, null)(CustomField);

export {CustomField as UnconnectedCustomField, ConnectedCustomField as CustomField, mapStateToProps};
