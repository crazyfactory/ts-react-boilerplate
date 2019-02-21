import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {createSelector} from "reselect";
import {stylesheet} from "typestyle";
import {Button} from "../components/Button";
import {Translator} from "../models/Translator";
import {ITranslator} from "../models/TranslatorInterfaces";
import {IStore} from "../redux/IStore";
import {
  decrement as decrementActionCreator,
  increment as incrementActionCreator
} from "../redux/modules/counterActionCreators";
import {translationsSelector} from "../selectors/translationsSelector";

const classNames = stylesheet({
  moveRight: {
    marginLeft: "8px"
  }
});

interface IStateToProps {
  count: number;
  translations: {
    counter: string;
    decrement: string;
    increment: string;
  };
}

interface IDispatchToProps {
  decrement: () => void;
  increment: () => void;
}

export interface IProps extends IStateToProps, IDispatchToProps {}

class CounterPage extends React.Component<IProps> {
  public render(): JSX.Element {
    const {count, decrement, increment, translations} = this.props;
    return (
      <div>
        <h4>{translations.counter}</h4>
        <Button name="decBtn" onClick={decrement} disabled={count <= 0}>
          {translations.decrement}
        </Button>
        <Button className={classNames.moveRight} name="incBtn" onClick={increment}>
          {translations.increment}
        </Button>
        <p>{count}</p>
      </div>
    );
  }
}

const componentTranslationsSelector = createSelector(
  translationsSelector,
  (translations) => {
    const translator: ITranslator = new Translator(translations);
    return {
      counter: translator.translate("Counter"),
      decrement: translator.translate("Decrement"),
      increment: translator.translate("Increment")
    };
  }
);

function mapStateToProps(state: Pick<IStore, "counter" | "settings">): IStateToProps {
  return {
    count: state.counter.count,
    translations: componentTranslationsSelector(state)
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
  return {
    decrement: () => dispatch(decrementActionCreator()),
    increment: () => dispatch(incrementActionCreator())
  };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(CounterPage);

export {connected as CounterPage, CounterPage as UnconnectedCounterPage, mapDispatchToProps, mapStateToProps};
