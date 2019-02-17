import * as React from "react";
import {connect} from "react-redux";
import {Dispatch} from "redux";
import {createSelector} from "reselect";
import {Translator} from "../models/Translator";
import {ITranslator} from "../models/TranslatorInterfaces";
import {IStore} from "../redux/IStore";
import {loadStarsCount as loadStarsActionCreator} from "../redux/modules/starsActionCreators";
import {translationsSelector} from "../selectors/translationsSelector";

interface IStateToProps {
  count: number;
  error: string;
  loaded: boolean;
  pending: boolean;
  translations: {
    fetchingStars: string;
  };
}

interface IDispatchToProps {
  loadStarsCount: () => void;
}

interface IProps extends IStateToProps, IDispatchToProps {}

class StarsPage extends React.Component<IProps> {
  constructor(props: IStateToProps & IDispatchToProps) {
    super(props);
    if (!this.props.loaded) {
      this.props.loadStarsCount();
    }
  }

  public render(): JSX.Element {
    const {count, error, pending, translations} = this.props;
    if (pending) {
      return <div>{translations.fetchingStars}</div>;
    } else {
      return error ? <div>{error}</div> : <div>{count}</div>;
    }
  }
}

const componentTranslationsSelector = createSelector(
  translationsSelector,
  (translations) => {
    const translator: ITranslator = new Translator(translations);
    return {
      fetchingStars: translator.translate("Fetching stars...")
    };
  }
);

function mapStateToProps(state: Pick<IStore, "settings" | "stars">): IStateToProps {
  return {
    count: state.stars.count,
    error: state.stars.error,
    loaded: state.stars.loaded,
    pending: state.stars.pending,
    translations: componentTranslationsSelector(state)
  };
}

function mapDispatchToProps(dispatch: Dispatch): IDispatchToProps {
  return {
    loadStarsCount: () => dispatch(loadStarsActionCreator.invoke(null))
  };
}

const connected = connect(mapStateToProps, mapDispatchToProps)(StarsPage);
export {connected as StarsPage, mapDispatchToProps, mapStateToProps, StarsPage as UnconnectedStarsPage};
